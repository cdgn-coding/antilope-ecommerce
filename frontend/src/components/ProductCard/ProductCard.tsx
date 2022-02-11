import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "@models/Product";
import Image from "@components/Image";
import Button from "@components/Button";
import Link from "@components/Link";

export interface ProductCardProps extends Product {}

const ProductCard = (props: ProductCardProps) => {
  const firstImage = props.images[0];
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          alt={props.name}
          src={firstImage}
          className={styles.image}
          layout="fill"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.price}>
          <div className={styles.priceText}>1 pago de $ {props.price}</div>
          <Link key={Math.random()} href={`/products/${props.sku}`}>
            <Button>Ver mas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
