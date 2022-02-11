import React from "react";
import Layout from "@components/Layout";
import useProduct from "@hooks/useProduct";
import useRouter from "@hooks/useRouter";
import useBuy from "@hooks/useBuy";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import styles from "./ProductDetail.module.css";
import ImageSelector from "@components/ImageSelector";
import ProductSummary from "@components/ProductSummary";
import useAddToCart from "@hooks/useAddToCart";

export interface ProductDetailProps {
  sku: string;
}

const ProductDetail = ({ sku }: ProductDetailProps) => {
  const { push } = useRouter();
  const onSearch = (query: string) => push(`/?search=${query}`);
  const { loading, data } = useProduct(sku);
  const { onBuyProduct } = useBuy();
  const { onAddProductToCart } = useAddToCart();
  const onAddToCart = React.useCallback(() => onAddProductToCart(sku), [sku]);
  const onBuy = React.useCallback(() => onBuyProduct(sku), [sku]);
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
          <div className={styles.imageSelector}>
            {data && <ImageSelector {...data} />}
          </div>
          <div className={styles.productSummary}>
            {data && (
              <ProductSummary
                {...data}
                onBuy={onBuy}
                onAddToCart={onAddToCart}
              />
            )}
          </div>
        </div>
        <div className={styles.relatedProducts}></div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
