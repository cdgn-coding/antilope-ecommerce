import * as aws from "@pulumi/aws";

export const containerRepository = new aws.ecr.Repository("backend", {
  imageScanningConfiguration: {
    scanOnPush: true,
  },
  imageTagMutability: "MUTABLE",
});
