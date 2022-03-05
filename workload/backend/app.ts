import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as pulumi from "@pulumi/pulumi";
import { config } from "../config";
import { types } from "@pulumi/kubernetesx";
import EnvMap = types.EnvMap;

export interface DemoAppArgs {
  provider: k8s.Provider;
  imageName: pulumi.Input<string>;
}

export default class App extends pulumi.ComponentResource {
  // @ts-ignore
  public readonly imageName: pulumi.Output<string>;
  // @ts-ignore
  public readonly persistentVolumeClaim: kx.PersistentVolumeClaim;
  // @ts-ignore
  public readonly configMap: kx.ConfigMap;
  // @ts-ignore
  public readonly secret: kx.Secret;
  public readonly deployment: kx.Deployment;
  public readonly service: kx.Service;
  // @ts-ignore
  public readonly endpoint: pulumi.Output<string>;
  public readonly url: pulumi.Output<string>;
  constructor(
    name: string,
    args: DemoAppArgs,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super("antilope-backend", name, args, opts);

    // Create a Secret from the DB connection information.
    const dbConnSecret = new kx.Secret(
      `${name}-aurora-db-conn`,
      {
        metadata: { namespace: config.appsNamespaceName },
        stringData: {
          host: config.dbConnection.apply((db) => db.host),
          username: config.dbConnection.apply((db) => db.username),
          password: config.dbConnection.apply((db) => db.password),
          database: config.dbConnection.apply((db) => db.database),
        },
      },
      { provider: args.provider }
    );

    const env = pulumi.all([dbConnSecret.stringData]).apply(([data]) => {
      const host = data["host"];
      const user = data["username"];
      const pass = data["password"];
      const db = data["database"];
      return <EnvMap>{
        env: "prod",
        HOST: ":8080",
        AWS_REGION: config.awsRegion,
        POSTGRES_DSN: `postgres://${user}:${pass}@${host}/${db}`,
        PRODUCTS_BUCKET_ID: config.productsBucketId,
        PRODUCTS_BUCKET_URL: pulumi.interpolate`http://${config.productsBucketDomain}`,
        CARTS_DYNAMODB_TABLE_ID: config.cartTableId,
        MERCADOPAGO_PUBLIC_KEY: config.mercadopagoPublicKey,
        MERCADOPAGO_ACCESS_TOKEN: config.mercadopagoAccessToken,
      };
    });

    // Define the PodBuilder for the Deployment.
    const pb = new kx.PodBuilder({
      containers: [
        {
          env,
          name: "antilope-backend",
          image: args.imageName,
          imagePullPolicy: "Always",
          resources: { requests: { cpu: "128m", memory: "256Mi" } },
          ports: { http: 8080 },
          livenessProbe: {
            httpGet: {
              path: "/ping",
              port: 8080,
            },
          },
        },
      ],
    });

    // Create a Deployment.
    this.deployment = new kx.Deployment(
      name,
      {
        spec: pb.asDeploymentSpec({ replicas: 2 }),
      },
      { provider: args.provider }
    );

    // Create a Service.
    this.service = this.deployment.createService({
      type: kx.types.ServiceType.LoadBalancer,
      ports: [{ port: 80, targetPort: "http" }],
    });
    this.url = pulumi.interpolate`http://${this.service.endpoint}`;
  }
}
