import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

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
  auth0Secret: pulumiConfig.requireSecret("auth0Secret"),
  auth0BaseUrl: pulumiConfig.requireSecret("auth0BaseUrl"),
  auth0IssuerBaseUrl: pulumiConfig.requireSecret("auth0IssuerBaseUrl"),
  auth0ClientId: pulumiConfig.requireSecret("auth0ClientId"),
  auth0ClientSecret: pulumiConfig.requireSecret("auth0ClientSecret"),
  backendDir: pulumiConfig.require("backendDir"),
  frontendDir: pulumiConfig.require("frontendDir"),
};

// Create a k8s provider for the cluster.
export const provider = new k8s.Provider("k8sProvider", {
  kubeconfig: config.kubeconfig,
});
