import * as k8s from "@pulumi/kubernetes";
import Backend from "./backend";
import { config } from "./config";
import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";

// Create a k8s provider for the cluster.
const provider = new k8s.Provider("k8sProvider", {
  kubeconfig: config.kubeconfig,
});

// Create ECR repository for the backend.
export const repository = new aws.ecr.Repository("backend", {
  imageScanningConfiguration: {
    scanOnPush: true,
  },
  imageTagMutability: "MUTABLE",
});

// Build and publish an image.
const repo = new awsx.ecr.Repository("backend", { repository: repository });

const image = repo.buildAndPushImage("../backend");

// Create the application on the cluster.
const instance = new Backend("antilope-backend", {
  provider,
  imageName: image,
});

export const instanceUrl = instance.url;
