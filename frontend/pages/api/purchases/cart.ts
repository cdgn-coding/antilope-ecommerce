// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "cross-fetch";
import { Response } from "@models/Response";
import { Purchase } from "@models/Purchase";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Purchase>>
) {
  // @ts-ignore
  const { user } = getSession(req, res);
  const userId = user?.sub;
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/purchases/cart`;
  const response = await fetch(url, { method: "POST" });
  const json = await response.json();
  res.status(200).json(json);
}

export default withApiAuthRequired(handler);
