// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import type { NextApiRequest, NextApiResponse } from "next";
import GetCartByUserId from "src/services/cart/GetCartById";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Cart>>
) {
  const userId = "fakeUserId";
  try {
    const cartResponse = await GetCartByUserId(userId);
    res.status(200).json(cartResponse);
  } catch (error) {
    // @ts-ignore
    return { error: error.message };
  }
}
