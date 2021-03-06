import React from "react";
import Layout from "@components/Layout";
import styles from "./Cart.module.css";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import useCart from "@hooks/useCart";
import ProductSelector from "@components/ProductSelector";
import { CartItem } from "@models/Cart";
import CartSummary from "@components/CartSummary";
import useRouter from "@hooks/useRouter";
import useBuy from "@hooks/useBuy";

const Cart = () => {
  const {
    loading,
    isEmpty,
    data,
    changesLoading,
    onChangeQuantity,
    onRemoveProduct,
  } = useCart();
  const { onBuyCart } = useBuy();
  const { push } = useRouter();
  const onSearch = (query: string) => push(`/?search=${query}`);
  const renderCartItems = ({ product, quantity }: CartItem) => (
    <div
      className={styles.cartItem}
      key={product.sku}
      data-testid={`product-card-${product.sku}`}
    >
      <ProductSelector
        product={product}
        quantity={quantity}
        onChangeQuantity={(quantity) => onChangeQuantity(product.sku, quantity)}
        onRemove={() => onRemoveProduct(product.sku)}
        loading={changesLoading}
      />
    </div>
  );

  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      onSearch={onSearch}
      loading={loading}
    >
      <div className={styles.container}>
        {isEmpty && <p>No hay productos en tu carrito.</p>}
        {!isEmpty && (
          <React.Fragment>
            <div className={styles.column}>
              <div className={styles.innerContent}>
                {data?.items.map(renderCartItems)}
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.innerContent}>
                <div className={styles.cartSummary} data-testid="cart-summary">
                  <CartSummary
                    total={data?.total}
                    subtotal={data?.subtotal}
                    shipment={data?.shipment}
                    onBuy={onBuyCart}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
