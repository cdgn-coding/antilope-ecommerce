import fetch from "cross-fetch";

export interface MercadoLibreItem {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  available_quantity: number;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
  pictures: {
    url: string;
  }[];
  description: MercadoLibreItemDescription;
}

export type MercadoLibreItemDescription = {
  text: string;
  plain_text: string;
};

export type MercadoLibreSearch = { id: string }[];

export const getDescription = async (
  itemId: string
): Promise<MercadoLibreItemDescription> => {
  const url = `https://api.mercadolibre.com/items/${itemId}/description`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getItem = async (itemId: string): Promise<MercadoLibreItem> => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  const response = await fetch(url);
  const data = await response.json();
  data.description = await getDescription(itemId);
  return data;
};

export const searchItems = async (
  query: string,
  limit: number
): Promise<MercadoLibreSearch> => {
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
