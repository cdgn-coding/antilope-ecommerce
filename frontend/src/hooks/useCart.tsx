import { useState, useEffect } from "react";
import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import fetch from "cross-fetch";

type CartResponse = Response<Cart>;

const fetchCart = async (): Promise<CartResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`);
  return await response.json();
};

const changeProductQuantity = async (
  sku: string,
  quantity: number
): Promise<CartResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/items/${sku}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({ quantity });
  const response = await fetch(url, { method: "PUT", headers, body });
  return await response.json();
};

const removeProductFromCart = async (sku: string): Promise<CartResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/items/${sku}`;
  const response = await fetch(url, { method: "DELETE" });
  return await response.json();
};

type useCartHook = () => {
  loading: boolean;
  isEmpty: boolean;
  changesLoading: boolean;
  onChangeQuantity: (sku: string, quantity: number) => void;
  onRemoveProduct: (sku: string) => void;
} & CartResponse;

const useCart: useCartHook = () => {
  const [cartResponse, setCartResponse] = useState<CartResponse>({});
  const [changesLoading, setChangesLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartEffect = async () => {
      const response = await fetchCart();
      setCartResponse(response);
      setLoading(false);
    };

    fetchCartEffect();
  }, []);

  const onRemoveProduct = async (sku: string) => {
    setChangesLoading(true);
    const response = await removeProductFromCart(sku);
    setCartResponse(response);
    setChangesLoading(false);
  };

  const onChangeQuantity = async (sku: string, quantity: number) => {
    setChangesLoading(true);
    const response = await changeProductQuantity(sku, quantity);
    setCartResponse(response);
    setChangesLoading(false);
  };

  const isEmpty = Boolean(
    cartResponse?.error || cartResponse.data?.items?.length === 0
  );

  return {
    ...cartResponse,
    isEmpty,
    loading,
    changesLoading,
    onRemoveProduct,
    onChangeQuantity,
  };
};

export default useCart;
