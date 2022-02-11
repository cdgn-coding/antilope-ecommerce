import React from "react";
import Button from "@components/Button";
import styles from "./CartSummary.module.css";

export interface CartSummaryProps {
  subtotal?: number;
  shipment?: number;
  total?: number;
  onBuy?: () => void;
}

const CartSummary = ({
  subtotal,
  shipment,
  total,
  onBuy = () => {},
}: CartSummaryProps) => {
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
      <Button onClick={onBuy}>Comprar</Button>
    </div>
  );
};

export default CartSummary;
