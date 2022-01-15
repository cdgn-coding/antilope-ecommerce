import React from "react";
import Layout from "@components/Layout";
import styles from "./Cart.module.css";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";

const Cart = () => {
  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
    >
      <div className={styles.container}></div>
    </Layout>
  );
};

export default Cart;
