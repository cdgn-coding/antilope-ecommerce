import { provider, config } from "../config";
import App from "./app";
import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";

const componentName = "antilope-frontend";

// Create ECR repository for the backend.
export const repository = new aws.ecr.Repository(componentName, {
  imageScanningConfiguration: {
    scanOnPush: true,
  },
  imageTagMutability: "MUTABLE",
});

// Build and publish an image.
const repo = new awsx.ecr.Repository(componentName, { repository: repository });

const image = repo.buildAndPushImage(config.frontendDir);

// Create the application on the cluster.
const instance = new App(componentName, {
  provider,
  imageName: image,
});

export const instanceUrl = instance.url;
