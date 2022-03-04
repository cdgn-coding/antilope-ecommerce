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

export const databaseName = "antilope";

export const rdsInstance = new aws.rds.Instance(name, {
  allocatedStorage: 5,
  engine: "postgres",
  engineVersion: "12.9",
  storageType: "standard",
  licenseModel: "postgresql-license",
  autoMinorVersionUpgrade: true,
  instanceClass: "db.t2.micro",
  dbSubnetGroupName: rdsSubnets.id,
  username: "antilope",
  password: dbPassword,
  skipFinalSnapshot: true,
  vpcSecurityGroupIds: [eksCluster.nodeSecurityGroup.id],
  publiclyAccessible: true,
  tags: tags,
  name: databaseName,
});
