import { Purchase } from "@models/Purchase";
import { Response } from "@models/Response";
import fetch from "cross-fetch";
import useRouter from "./useRouter";

const useBuy = () => {
  const { push } = useRouter();

  const onBuyCart = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases/cart`;
    const response = await fetch(url, { method: "POST" });

    switch (response.status) {
      case 200: {
        const json = (await response.json()) as Response<Purchase>;
        const redirectUrl = json?.data?.payment?.mercadoPagoURL;
        if (redirectUrl) {
          push(redirectUrl);
        }
        break;
      }
      case 401: {
        const pathname = document.location.pathname;
        push(`/api/auth/login?returnTo=${encodeURIComponent(pathname)}`);
        break;
      }
    }
  };

  const onBuyProduct = async (sku: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases/products/${sku}`;
    const response = await fetch(url, { method: "POST" });
    switch (response.status) {
      case 200: {
        const json = (await response.json()) as Response<Purchase>;
        const redirectUrl = json?.data?.payment?.mercadoPagoURL;
        if (redirectUrl) {
          push(redirectUrl);
        }
        break;
      }
      case 401: {
        const pathname = document.location.pathname;
        push(`/api/auth/login?returnTo=${encodeURIComponent(pathname)}`);
        break;
      }
    }
  };
  return { onBuyProduct, onBuyCart };
};

export default useBuy;
