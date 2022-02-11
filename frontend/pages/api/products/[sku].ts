// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GetProductBySKU from "src/services/product/GetProductBySKU";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sku = req.query.sku as string;
  const productResponse = await GetProductBySKU(sku);
  res.status(200).json(productResponse as Data);
}
