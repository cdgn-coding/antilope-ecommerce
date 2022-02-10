import { Pack, Purchase } from "@models/Purchase";
import GetProductBySKU from "../product/GetProductBySKU";
import { PaginatedResponse } from "@models/PaginatedResponse";

const addProductToPack = async (pack: Pack): Promise<Pack> => {
  const productResponse = await GetProductBySKU(pack.productSku);
  const product = productResponse.data;
  return { ...pack, product };
};

const addProductToPacks = async (purchase: Purchase): Promise<Purchase> => {
  const packs = await Promise.all(purchase.packs.map(addProductToPack));
  return {
    ...purchase,
    packs,
  };
};

const aggregateProductsIntoPurchases = async (
  purchasesResponse: PaginatedResponse<Purchase>
): Promise<PaginatedResponse<Purchase>> => {
  const rawData = purchasesResponse.data || [];
  const data = await Promise.all(rawData.map(addProductToPacks));
  return {
    ...purchasesResponse,
    data,
  };
};

export default async function SearchPurchasesByUserId(
  userId: string,
  page: string
): Promise<PaginatedResponse<Purchase>> {
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/purchases?page=${page}`;
  const response = await fetch(url);
  const purchasesResponse = await response.json();
  const aggregatedPurchasesAndProducts = await aggregateProductsIntoPurchases(
    purchasesResponse
  );
  return aggregatedPurchasesAndProducts;
}
