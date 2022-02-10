import fetch from "cross-fetch";
import { Product } from "@models/Product";
import { Response } from "@models/Response";

export default async function GetProductBySKU(
  sku: string
): Promise<Response<Product>> {
  const url = `${process.env.BACKEND_API_BASE_URL}/products/${sku}`;
  const response = await fetch(url);
  return await response.json();
}
