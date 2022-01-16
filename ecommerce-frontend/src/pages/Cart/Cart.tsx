import React from "react";
import Layout from "@components/Layout";
import styles from "./Cart.module.css";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import useCart from "@hooks/useCart";
import ProductSelector from "@components/ProductSelector";
import { CartItem } from "@models/Cart";
import CartSummary from "@components/CartSummary";

const renderCartItems = ({ product, quantity }: CartItem) => (
  <div className={styles.cartItem} key={product.sku}>
    <ProductSelector product={product} quantity={quantity} />
  </div>
);

const Cart = () => {
  const { loading, data } = useCart();
  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      loading={loading}
    >
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.innerContent}>
            {data?.items.map(renderCartItems)}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.innerContent}>
            <CartSummary
              total={data?.total}
              subtotal={data?.subtotal}
              shipment={data?.shipment}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
