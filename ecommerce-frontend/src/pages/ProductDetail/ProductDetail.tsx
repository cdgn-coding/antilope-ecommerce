import React from "react";
import Layout from "@components/Layout";
import useProduct from "@hooks/useProduct";
import useRouter from "@hooks/useRouter";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import styles from "./ProductDetail.module.css";
import ImageSelector from "@components/ImageSelector";

export interface ProductDetailProps {
  sku: string;
}

const ProductDetail = ({ sku }: ProductDetailProps) => {
  const { push } = useRouter();
  const onSearch = (query: string) => push(`/?search=${query}`);
  const { loading, data } = useProduct(sku);
  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      onSearch={onSearch}
      loading={loading}
    >
      <div className={styles.container}>
        <div className={styles.productDetail}>
          {data && <ImageSelector images={data?.images} />}
        </div>
        <div className={styles.relatedProducts}></div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
