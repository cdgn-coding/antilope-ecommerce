// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import PutProductToCart from "src/services/cart/PutProductToCart";
import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import DeleteProductFromCart from "src/services/cart/DeleteProductFromCart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Cart>>
) {
  const sku = req.query.sku as string;
  const userId = "fakeUserId";

  switch (req.method) {
    case "PUT": {
      const quantity = Number(req.body.quantity);
      const json = await PutProductToCart(userId, sku, quantity);
      res.status(200).json(json);
      break;
    }
    case "DELETE": {
      const json = await DeleteProductFromCart(userId, sku);
      res.status(200).json(json);
      break;
    }
    default: {
      res.status(405).end();
      break;
    }
  }
}
