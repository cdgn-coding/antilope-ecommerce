import * as eks from "@pulumi/eks";
import * as pulumi from "@pulumi/pulumi";
import { vpc } from "./vpc";

const name = pulumi.getProject();
const tags = { Project: name };

export const eksCluster = new eks.Cluster("eks", {
  vpcId: vpc.id,
  publicSubnetIds: vpc.publicSubnetIds,
  privateSubnetIds: vpc.privateSubnetIds,
  deployDashboard: false,
  nodeAssociatePublicIpAddress: false,
  tags,
});

export const kubeconfig = eksCluster.kubeconfig;
