import { useState, useEffect } from "react";
import { Cart, CartItem } from "@models/Cart";
import fetch from "cross-fetch";

const fetchCart = async (): Promise<Cart> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`);
  return await response.json();
};

type useCartHook = () => {
  loading: boolean;
} & Cart;

const initialCartState: Cart = {
  items: [],
  id: "",
};

const useCart: useCartHook = () => {
  const [cart, setCart] = useState<Cart>(initialCartState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartEffect = async () => {
      const cart = await fetchCart();
      setCart(cart);
      setLoading(false);
    };

    fetchCartEffect();
  }, []);

  return { ...cart, loading };
};

export default useCart;
