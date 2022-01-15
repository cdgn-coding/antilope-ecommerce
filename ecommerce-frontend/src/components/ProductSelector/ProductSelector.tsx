import styles from "./ProductSelector.module.css";
import { Product } from "@models/Product";
import Image from "@components/Image";
import { MdOutlineDeleteOutline } from "react-icons/md";

export interface ProductSelectorProps {
  product: Product;
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const ProductSelector = ({
  product,
  quantity,
  onChangeQuantity,
  onRemove,
}: ProductSelectorProps) => {
  const productImage = product.images[0];
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={productImage}
          alt={product.name}
          className={styles.image}
          layout="fill"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>$ {product.price}</div>
        <div className={styles.quantitySelector}>
          <div
            className={styles.quantityButton}
            onClick={() => onChangeQuantity(quantity - 1)}
          >
            -
          </div>
          <div className={styles.quantity}>{quantity}</div>
          <div
            className={styles.quantityButton}
            onClick={() => onChangeQuantity(quantity + 1)}
          >
            +
          </div>
        </div>
      </div>
      <div className={styles.removeButtonContainer}>
        <span className={styles.removeButton} onClick={onRemove}>
          <MdOutlineDeleteOutline onClick={onRemove} />
        </span>
      </div>
    </div>
  );
};

export default ProductSelector;
