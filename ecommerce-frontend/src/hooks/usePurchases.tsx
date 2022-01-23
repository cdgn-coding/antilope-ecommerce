import { useState, useEffect, useCallback } from "react";
import { Purchase } from "@models/Purchase";
import { PaginatedResponse } from "@models/PaginatedResponse";
import fetch from "cross-fetch";

type GetPurchasesResponse = PaginatedResponse<Purchase>;

const fetchPurchases = async (page: number): Promise<GetPurchasesResponse> => {
  const queryParams = `?&page=${page}`;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases/${queryParams}`
  );
  return await response.json();
};

type usePurchasesHook = {
  loading: boolean;
  onNext: () => void;
  onPrevious: () => void;
} & GetPurchasesResponse;

const useProduct = (): usePurchasesHook => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [purchasesResponse, setPurchasesResponse] =
    useState<GetPurchasesResponse>({});

  const onNext = useCallback(() => setPage(page + 1), [page]);
  const onPrevious = useCallback(() => setPage(page - 1), [page]);

  useEffect(() => {
    const fetchPurchasesEffect = async () => {
      const response = await fetchPurchases(page);
      setPurchasesResponse(response);
      setLoading(false);
    };

    fetchPurchasesEffect();
  }, []);

  return { ...purchasesResponse, loading, onNext, onPrevious };
};

export default useProduct;
