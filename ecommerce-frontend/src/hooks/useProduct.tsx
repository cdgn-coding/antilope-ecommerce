import { useState, useEffect } from "react";
import { Product } from "@models/Product";
import { Response } from "@models/Response";
import fetch from "cross-fetch";

type GetProductResponse = Response<Product>;

const fetchProduct = async (sku: string): Promise<GetProductResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${sku}`
  );
  return await response.json();
};

type useProductHook = {
  loading: boolean;
} & GetProductResponse;

const useProduct = (sku: string): useProductHook => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productResponse, setProductResponse] = useState<GetProductResponse>(
    {}
  );

  useEffect(() => {
    const fetchProductEffect = async () => {
      const response = await fetchProduct(sku);
      setProductResponse(response);
      setLoading(false);
    };

    fetchProductEffect();
  }, []);

  return { ...productResponse, loading };
};

export default useProduct;
