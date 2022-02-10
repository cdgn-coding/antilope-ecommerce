import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import GetCartByUserId from "./GetCartById";

export default async function DeleteProductFromCart(
  userId: string,
  sku: string
): Promise<Response<Cart>> {
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/cart/items/${sku}`;
  const headers = {
    "Content-Type": "application/json",
  };
  await fetch(url, { method: "DELETE", headers });
  return await GetCartByUserId(userId);
}
