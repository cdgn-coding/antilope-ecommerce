import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import GetCartByUserId from "./GetCartById";

export default async function PutProductToCart(
  userId: string,
  sku: string,
  quantity: number
): Promise<Response<Cart>> {
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/cart/items/${sku}`;
  const body = JSON.stringify({ quantity });
  const headers = {
    "Content-Type": "application/json",
  };
  await fetch(url, { method: "PUT", body, headers });
  return await GetCartByUserId(userId);
}
