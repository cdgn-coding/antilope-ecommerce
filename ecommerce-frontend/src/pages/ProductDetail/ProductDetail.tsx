import React from "react";
import Layout from "@components/Layout";
import useProduct from "@hooks/useProduct";
import useRouter from "@hooks/useRouter";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";

export interface ProductDetailProps {
  sku: string;
}

const ProductDetail = ({ sku }: ProductDetailProps) => {
  const { push } = useRouter();
  const onSearch = (query: string) => push(`/?search=${query}`);
  const { loading } = useProduct(sku);
  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      onSearch={onSearch}
      loading={loading}
    ></Layout>
  );
};

export default ProductDetail;
