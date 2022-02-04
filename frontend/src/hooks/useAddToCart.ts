import useRouter from "./useRouter";

const useAddToCart = () => {
  const { push } = useRouter();
  const onAddProductToCart = async (sku: string, quantity: number = 1) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/items/${sku}`;
    const body = JSON.stringify({ quantity });
    const headers = {
      "Content-Type": "application/json",
    };
    await fetch(url, { method: "PUT", body, headers });
    push("/cart");
  };

  return { onAddProductToCart };
};

export default useAddToCart;
