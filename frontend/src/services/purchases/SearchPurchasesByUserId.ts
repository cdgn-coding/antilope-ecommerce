import { Response } from "@models/Response";
import { Purchase } from "@models/Purchase";

export default async function SearchPurchasesByUserId(
  userId: string,
  page: string
): Promise<Response<Purchase>> {
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/purchases?page=${page}`;
  const response = await fetch(url);
  return await response.json();
}
