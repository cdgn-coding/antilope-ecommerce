import * as aws from "@pulumi/aws";

export const containerRepository = new aws.ecr.Repository("frontend", {
  imageScanningConfiguration: {
    scanOnPush: true,
  },
  imageTagMutability: "MUTABLE",
});
