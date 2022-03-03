import * as pulumi from "@pulumi/pulumi";

let pulumiConfig = new pulumi.Config();

// Existing Pulumi stack reference in the format:
// <organization>/<project>/<stack> e.g. "myUser/myProject/dev"
const clusterStackRef = new pulumi.StackReference(
  pulumiConfig.require("clusterStackRef")
);

export const config = {
  // Cluster
  kubeconfig: clusterStackRef.getOutput("kubeconfig").apply(JSON.stringify),
  dbConnection: clusterStackRef.getOutput("dbConnection"),
  cartTableId: clusterStackRef.getOutput("cartTableId"),
  productsBucketId: clusterStackRef.getOutput("productsBucketId"),
  productsBucketDomain: clusterStackRef.getOutput("productsBucketDomain"),
  mercadopagoPublicKey: pulumiConfig.requireSecret("mercadopagoPublicKey"),
  mercadopagoAccessToken: pulumiConfig.requireSecret("mercadopagoAccessToken"),
  appsNamespaceName: clusterStackRef.getOutput("appsNamespaceName"),
  awsRegion: pulumiConfig.require("aws-region"),
};
