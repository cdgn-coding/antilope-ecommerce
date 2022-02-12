import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

const name = pulumi.getProject();
const tags = { Project: name };

export const vpc = new awsx.ec2.Vpc(
  name,
  {
    cidrBlock: "172.16.0.0/16",
    numberOfAvailabilityZones: "all",
    tags,
  },
  // See https://github.com/pulumi/pulumi-eks/issues/271
  {
    transformations: [
      (args) => {
        if (
          args.type === "aws:ec2/vpc:Vpc" ||
          args.type === "aws:ec2/subnet:Subnet"
        ) {
          return {
            props: args.props,
            opts: pulumi.mergeOptions(args.opts, { ignoreChanges: ["tags"] }),
          };
        }
        return undefined;
      },
    ],
  }
);
