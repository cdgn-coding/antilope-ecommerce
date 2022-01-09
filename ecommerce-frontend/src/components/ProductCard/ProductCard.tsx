import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "@models/Product";
import Image from "@components/Image";

export interface ProductCardProps extends Product {}

const ProductCard = (props: ProductCardProps) => {
  const firstImage = props.images[0];
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image alt={props.name} src={firstImage} className={styles.image} layout="fill" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.price}>$ {props.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
