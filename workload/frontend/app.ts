import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as pulumi from "@pulumi/pulumi";
import { config } from "../config";
import { types } from "@pulumi/kubernetesx";
import { instanceUrl as backendInstanceUrl } from "../backend";
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
    super("antilope-frontend", name, args, opts);

    const env = <EnvMap>{
      BACKEND_API_BASE_URL: backendInstanceUrl,
      AUTH0_SECRET: config.auth0Secret,
      AUTH0_BASE_URL: config.auth0BaseUrl,
      AUTH0_ISSUER_BASE_URL: config.auth0IssuerBaseUrl,
      AUTH0_CLIENT_ID: config.auth0ClientId,
      AUTH0_CLIENT_SECRET: config.auth0ClientSecret,
    };

    // Define the PodBuilder for the Deployment.
    const pb = new kx.PodBuilder({
      containers: [
        {
          env,
          name: "antilope-frontend",
          image: args.imageName,
          imagePullPolicy: "Always",
          resources: { requests: { cpu: "128m", memory: "128Mi" } },
          ports: { http: 3000 },
          livenessProbe: {
            httpGet: {
              path: "/ping",
              port: 3000,
            },
          },
        },
      ],
    });

    // Create a Deployment.
    this.deployment = new kx.Deployment(
      name,
      {
        spec: pb.asDeploymentSpec({ replicas: 1 }),
      },
      { provider: args.provider }
    );

    // Create a Service.
    this.service = this.deployment.createService({
      type: kx.types.ServiceType.LoadBalancer,
      ports: [
        { port: 80, name: "http", targetPort: "http" },
        { port: 443, name: "https", targetPort: "http" },
      ],
    });

    this.url = pulumi.interpolate`http://${this.service.endpoint}`;
  }
}
