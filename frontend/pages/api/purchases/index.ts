// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import SearchPurchasesByUserId from "src/services/purchases/SearchPurchasesByUserId";
import { Response } from "@models/Response";
import { Purchase } from "@models/Purchase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Purchase>>
) {
  const page = req.query?.page as string;
  const userId = "fakeUserId";
  const json = await SearchPurchasesByUserId(userId, page);
  res.status(200).json(json);
}
