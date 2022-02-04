// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "cross-fetch";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sku = req.query.sku;
  const userId = "fakeUserId";
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/purchases/products/${sku}`;
  const response = await fetch(url, { method: "POST" });
  const json = await response.json();
  res.status(200).json(json);
}
