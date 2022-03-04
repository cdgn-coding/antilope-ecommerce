import App from "./app";
import { provider, config } from "../config";
import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";

const componentName = "antilope-backend";

// Create ECR repository for the backend.
export const repository = new aws.ecr.Repository(componentName, {
  imageScanningConfiguration: {
    scanOnPush: true,
  },
  imageTagMutability: "MUTABLE",
});

// Build and publish an image.
const repo = new awsx.ecr.Repository(componentName, { repository: repository });

const image = repo.buildAndPushImage(config.backendDir);

// Create the application on the cluster.
const instance = new App(componentName, {
  provider,
  imageName: image,
});

export const instanceUrl = instance.url;
