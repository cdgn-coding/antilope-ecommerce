import { useState, useEffect } from "react";
import { Cart } from "@models/Cart";
import { Response } from "@models/Response";
import fetch from "cross-fetch";

type CartResponse = Response<Cart>;

const fetchCart = async (): Promise<CartResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`);
  return await response.json();
};

type useCartHook = () => {
  loading: boolean;
} & CartResponse;

const useCart: useCartHook = () => {
  const [data, setData] = useState<CartResponse>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartEffect = async () => {
      const data = await fetchCart();
      setData(data);
      setLoading(false);
    };

    fetchCartEffect();
  }, []);

  return { ...data, loading };
};

export default useCart;
