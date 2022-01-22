import { useState, useEffect } from "react";
import { Purchase } from "@models/Purchase";
import { Response } from "@models/Response";
import fetch from "cross-fetch";

type GetPurchasesResponse = Response<Purchase>;

const fetchPurchases = async (): Promise<GetPurchasesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases/`
  );
  return await response.json();
};

type usePurchasesHook = {
  loading: boolean;
} & GetPurchasesResponse;

const useProduct = (): usePurchasesHook => {
  const [loading, setLoading] = useState<boolean>(true);
  const [purchasesResponse, setPurchasesResponse] =
    useState<GetPurchasesResponse>({});

  useEffect(() => {
    const fetchPurchasesEffect = async () => {
      const response = await fetchPurchases();
      setPurchasesResponse(response);
      setLoading(false);
    };

    fetchPurchasesEffect();
  }, []);

  return { ...purchasesResponse, loading };
};

export default useProduct;
