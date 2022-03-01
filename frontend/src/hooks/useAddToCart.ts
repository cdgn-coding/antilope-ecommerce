import useRouter from "./useRouter";

const useAddToCart = () => {
  const { push } = useRouter();
  const onAddProductToCart = async (sku: string, quantity: number = 1) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/items/${sku}`;
    const body = JSON.stringify({ quantity });
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { method: "PUT", body, headers });
    switch (response.status) {
      case 200: {
        push("/cart");
        break;
      }
      case 401: {
        const pathname = document.location.pathname;
        push(`/api/auth/login?returnTo=${encodeURIComponent(pathname)}`);
        break;
      }
    }
  };

  return { onAddProductToCart };
};

export default useAddToCart;
