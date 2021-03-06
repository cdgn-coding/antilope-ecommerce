import { useState, useEffect, useCallback } from "react";
import fetch from "cross-fetch";
import { Product } from "@models/Product";
import { Category, Categories } from "@models/Category";
import { PaginatedResponse } from "@models/PaginatedResponse";
import useRouter from "@hooks/useRouter";

type SearchProductsResponse = PaginatedResponse<Product>;

const fetchProducts = async (
  search: string,
  page: number,
  category: Category
): Promise<SearchProductsResponse> => {
  const queryParams = `search=${search}&page=${page}&category=${category}`;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${queryParams}`
  );
  return await response.json();
};

type useProductsHook = () => {
  loading: boolean;
  error: unknown;
  onSearch: (search: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSelectCategory: (category: Category) => void;
} & PaginatedResponse<Product>;

const useProducts: useProductsHook = () => {
  const { query } = useRouter();
  const [data, setData] = useState<SearchProductsResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>(Categories.ALL);
  const [page, setPage] = useState(1);

  const onNext = useCallback(() => setPage(page + 1), [page]);
  const onPrevious = useCallback(() => setPage(page - 1), [page]);
  const onSearch = useCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, []);
  const onSelectCategory = (value: string) => {
    if (value in Categories) {
      setCategory(value);
      setPage(1);
      return;
    }

    setCategory(Categories.ALL);
    setPage(1);
  };

  useEffect(() => {
    const initialCategory = (query?.category as Category) || Categories.ALL;
    const initialSearch = (query?.search as string) || "";
    const initialPage = Number(query?.page) || 1;

    setCategory(initialCategory);
    setSearch(initialSearch);
    setPage(initialPage);
  }, [query]);

  useEffect(() => {
    const fetchProductsEffect = async () => {
      try {
        const data = await fetchProducts(search, page, category);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsEffect();
  }, [search, page, category]);

  return {
    ...data,
    loading,
    error,
    onSearch,
    onNext,
    onPrevious,
    onSelectCategory,
  };
};

export default useProducts;
