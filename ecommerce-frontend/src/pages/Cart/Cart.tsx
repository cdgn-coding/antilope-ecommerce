import React from "react";
import Layout from "@components/Layout";
import styles from "./Cart.module.css";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { loading, items } = useCart();
  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      loading={loading}
    >
      <div className={styles.container}></div>
    </Layout>
  );
};

export default Cart;
