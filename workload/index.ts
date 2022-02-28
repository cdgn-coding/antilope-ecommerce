import * as k8s from "@pulumi/kubernetes";
import * as backend from "./backend";
import { config } from "./config";

// Create a k8s provider for the cluster.
const provider = new k8s.Provider("k8sProvider", {
  kubeconfig: config.kubeconfig,
});

// Create the application on the cluster.
const instance = new backend.App("demo", {
  provider,
  imageName: "vad1mo/hello-world-rest",
});
export const instanceUrl = instance.url;
