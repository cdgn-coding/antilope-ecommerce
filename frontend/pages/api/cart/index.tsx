// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import GetCartByUserId from "src/services/cart/GetCartById";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Cart>>
) {
  try {
    // @ts-ignore
    const { user } = getSession(req, res);
    const userId = user?.sub;
    const cartResponse = await GetCartByUserId(userId);
    res.status(200).json(cartResponse);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
}

// @ts-ignore
export default withApiAuthRequired(handler);
