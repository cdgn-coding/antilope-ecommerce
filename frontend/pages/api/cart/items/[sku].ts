// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import PutProductToCart from "src/services/cart/PutProductToCart";
import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import DeleteProductFromCart from "src/services/cart/DeleteProductFromCart";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Cart>>
) {
  const sku = req.query.sku as string;
  // @ts-ignore
  const { user } = getSession(req, res);
  const userId = user?.sub;

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

export default withApiAuthRequired(handler);
