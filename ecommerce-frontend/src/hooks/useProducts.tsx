import { useState, useEffect, useCallback } from 'react';
import { Product } from '@models/Product';
import { PaginatedResponse } from '@models/PaginatedResponse';

type SearchProductsResponse = PaginatedResponse<Product>;

const fetchProducts = async (search: string, page: number): Promise<SearchProductsResponse> => {
  return await fetch(`/api/products?search=${search}&page=${page}`).then(res => res.json());
}

type useProductsHook = () => {
  loading: boolean;
  error: unknown;
  onSearch: (search: string) => void
  onNext: () => void
  onPrevious: () => void
} & PaginatedResponse<Product>;

const useProducts: useProductsHook = () => {
  const [data, setData] = useState<SearchProductsResponse>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const onNext = useCallback(() => setPage(page + 1), [page]);
  const onPrevious = useCallback(() => setPage(page - 1), [page]);
  const onSearch = useCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, []);

  useEffect(() => {
    const fetchProductsEffect = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(search, page);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsEffect();
  }, [search, page]);

  return { ...data, loading, error, onSearch, onNext, onPrevious };
}

export default useProducts;