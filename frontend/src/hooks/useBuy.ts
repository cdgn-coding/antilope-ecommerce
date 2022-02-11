import { Purchase } from "@models/Purchase";
import { Response } from "@models/Response";
import fetch from "cross-fetch";
import useRouter from "./useRouter";

const useBuy = () => {
  const { push } = useRouter();

  const onBuyCart = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases/cart`;
    const response = await fetch(url, { method: "POST" });
    const json = (await response.json()) as Response<Purchase>;
    const redirectUrl = json?.data?.payment?.mercadoPagoURL;
    if (redirectUrl) {
      push(redirectUrl);
    }
  };

  const onBuyProduct = async (sku: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases/products/${sku}`;
    const response = await fetch(url, { method: "POST" });
    const json = (await response.json()) as Response<Purchase>;
    const redirectUrl = json?.data?.payment?.mercadoPagoURL;
    if (redirectUrl) {
      push(redirectUrl);
    }
  };
  return { onBuyProduct, onBuyCart };
};

export default useBuy;
