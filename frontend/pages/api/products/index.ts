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
  const { search, page, category } = req.query;
  const url = `${process.env.BACKEND_API_BASE_URL}/products?search=${search}&page=${page}&category=${category}`;
  const response = await fetch(url);
  const json = await response.json();
  res.status(200).json(json);
}
