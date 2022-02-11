import { Cart, CartItem } from "@models/Cart";
import { Product } from "@models/Product";
import { Response } from "@models/Response";

const fetchProduct = async (sku: string): Promise<Product> => {
  const url = `${process.env.BACKEND_API_BASE_URL}/products/${sku}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
};

const mapItems = async (items: {
  [key: string]: { quantity: number };
}): Promise<CartItem[]> => {
  const mapItem = async (sku: string) => {
    const quantity = items[sku].quantity;
    const product = await fetchProduct(sku);
    return { product, quantity };
  };
  return await Promise.all(Object.keys(items).map(mapItem));
};

const transformResponse = async (
  cartResponse: any
): Promise<Response<Cart>> => {
  const id = cartResponse?.data.id;
  const items = await mapItems(cartResponse?.data.items);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipment = 0;
  const total = subtotal + shipment;
  return {
    data: {
      id,
      items,
      subtotal,
      shipment,
      total,
    },
  };
};

export default async function GetCartByUserId(
  userId: string
): Promise<Response<Cart>> {
  const url = `${process.env.BACKEND_API_BASE_URL}/users/${userId}/cart`;
  try {
    const response = await fetch(url);
    const cartResponse = await response.json();
    return await transformResponse(cartResponse);
  } catch (error) {
    // @ts-ignore
    return { error: error.message };
  }
}
