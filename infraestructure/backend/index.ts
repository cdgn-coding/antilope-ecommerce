import { productsBucket } from "./productsBucket";
import { cartsTable } from "./cartsTable";
import { rdsCluster, dbPassword } from "./rds";

export const productsBucketId = productsBucket.id;
export const cartTableId = cartsTable.id;
export const dbConnection = {
  host: rdsCluster.endpoint,
  port: rdsCluster.port.apply((port) => port.toString()),
  username: rdsCluster.masterUsername,
  password: dbPassword,
  database: "test",
};
