type useProductHook = {
  loading: boolean;
};

const useProduct = (sku: string) => {
  return { loading: true };
};

export default useProduct;
