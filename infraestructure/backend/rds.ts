import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { vpc } from "../k8/vpc";
import { eksCluster } from "../k8/eks";

const config = new pulumi.Config();
const name = pulumi.getProject();
const tags = { Project: name };

export const dbPassword = config.requireSecret("dbPassword");

export const rdsSubnets = new aws.rds.SubnetGroup(`${name}-subnets`, {
  subnetIds: vpc.privateSubnetIds, // Same subnets as EKS nodes.
});

export const rdsCluster = new aws.rds.Cluster(`${name}-cluster`, {
  databaseName: "pulumi",
  dbSubnetGroupName: rdsSubnets.id,
  engine: "aurora-postgresql",
  engineVersion: "11.6",
  masterUsername: "pulumi",
  masterPassword: dbPassword,
  storageEncrypted: true,
  skipFinalSnapshot: true,
  vpcSecurityGroupIds: [eksCluster.nodeSecurityGroup.id], // Must be able to communicate with EKS nodes.
  tags: tags,
});

export const instance = new aws.rds.ClusterInstance(name, {
  clusterIdentifier: rdsCluster.id,
  engine: "aurora-postgresql",
  engineVersion: "11.6",
  instanceClass: "db.t2.micro",
  tags: tags,
});
