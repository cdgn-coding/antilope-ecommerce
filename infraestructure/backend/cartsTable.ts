import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentStack = pulumi.getStack();
const cartsTableName = `${currentStack}-cart`;

export const cartsTable = new aws.dynamodb.Table(cartsTableName, {
  attributes: [
    {
      name: "Id",
      type: "S",
    },
  ],
  billingMode: "PAY_PER_REQUEST",
  hashKey: "Id",
});
