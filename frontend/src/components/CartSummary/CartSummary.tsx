import React from "react";
import styles from "./CartSummary.module.css";

export interface CartSummaryProps {
  subtotal?: number;
  shipment?: number;
  total?: number;
}

const CartSummary = ({ subtotal, shipment, total }: CartSummaryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.itemLabel}>Productos</div>
        <div className={styles.itemValue}>$ {subtotal}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemLabel}>Envío</div>
        <div className={styles.itemValue}>$ {shipment}</div>
      </div>
      <div className={styles.divider} />
      <div className={styles.item}>
        <div className={styles.itemLabel}>Total</div>
        <div className={styles.itemValue}>$ {total}</div>
      </div>
    </div>
  );
};

export default CartSummary;
