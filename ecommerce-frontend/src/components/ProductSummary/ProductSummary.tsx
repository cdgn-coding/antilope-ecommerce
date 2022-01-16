import React from "react";
import styles from "./ProductSummary.module.css";
import Button from "@components/Button";

export interface ProductSummaryProps {
  name: string;
  stock: number;
  price: number;
  description: string;
}

const ProductSummary = ({
  name,
  stock,
  price,
  description,
}: ProductSummaryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>$ {price}</div>
      <div className={styles.stock}>
        Stock disponible <span className={styles.stockNumber}>{stock}</span>
      </div>
      <div className={styles.actions}>
        <Button>Comprar</Button>
        <Button>Agregar al carrito</Button>
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionLabel}>Sobre este producto</div>
        <div className={styles.descriptionContent}>{description}</div>
      </div>
    </div>
  );
};

export default ProductSummary;
