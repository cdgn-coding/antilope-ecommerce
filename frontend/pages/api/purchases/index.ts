// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import SearchPurchasesByUserId from "src/services/purchases/SearchPurchasesByUserId";
import { PaginatedResponse } from "@models/PaginatedResponse";
import { Purchase } from "@models/Purchase";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedResponse<Purchase>>
) {
  const page = req.query?.page as string;
  // @ts-ignore
  const { user } = getSession(req, res);
  const userId = user?.sub;
  const json = await SearchPurchasesByUserId(userId, page);
  res.status(200).json(json);
}

export default withApiAuthRequired(handler);
