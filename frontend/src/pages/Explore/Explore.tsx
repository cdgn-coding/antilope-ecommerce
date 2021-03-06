import React from "react";
import Layout from "@components/Layout";
import styles from "./Explore.module.css";
import useProducts from "@hooks/useProducts";
import ProductCard from "@components/ProductCard";
import Pagination from "@components/Pagination";
import { Product } from "@models/Product";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";

const renderCard = (product: Product) => (
  <div
    className={styles.product}
    data-testid={`product-card-${product.sku}`}
    key={Math.random()}
  >
    <ProductCard {...product} />
  </div>
);

const Explore = () => {
  const {
    data,
    totalPages,
    page,
    loading,
    onSearch,
    onNext,
    onPrevious,
    onSelectCategory,
  } = useProducts();

  return (
    <Layout
      withSecondaryMenu
      onSearch={onSearch}
      loading={loading}
      withoutSecondaryMenuLinks
      onSelectSecondaryItem={onSelectCategory}
      secondaryMenuItems={secondaryMenuItems}
      menuItems={menuItems}
    >
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.productList}>{data?.map(renderCard)}</div>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </div>
    </Layout>
  );
};

export default Explore;
