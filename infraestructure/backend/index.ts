import { productsBucket } from "./productsBucket";
import { cartsTable } from "./cartsTable";
import { rdsInstance, dbPassword, databaseName } from "./rds";

export const productsBucketId = productsBucket.id;
export const productsBucketDomain = productsBucket.bucketDomainName;
export const cartTableId = cartsTable.id;
export const dbConnection = {
  host: rdsInstance.endpoint,
  port: rdsInstance.port.apply((port) => port.toString()),
  username: rdsInstance.username,
  password: dbPassword,
  database: databaseName,
};
