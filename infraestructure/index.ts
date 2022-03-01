export { eksCluster, vpc, kubeconfig } from "./k8";

export {
  productsBucketId,
  cartTableId,
  dbConnection,
  containerRepository as backendRepository,
} from "./backend";
export { containerRepository as frontendRepository } from "./frontend";
