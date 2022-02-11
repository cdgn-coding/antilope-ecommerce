import React from "react";
import useRouter from "@hooks/useRouter";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import Layout from "@components/Layout";
import usePurchases from "@hooks/usePurchases";
import styles from "./Purchases.module.css";
import { Purchase, Pack } from "@models/Purchase";
import PurchaseCard from "@components/PurchaseCard";
import Pagination from "@components/Pagination";

const PurchaseCardComponentFactory = (purchase: Purchase) =>
  function PurchaseCardComponent(pack: Pack) {
    return (
      <div className={styles.purchasePack}>
        <PurchaseCard
          quantity={pack.quantity}
          product={pack.product}
          amount={pack.amount}
          status={purchase.status}
          createdAt={purchase.createdAt}
          invoiceUrl={purchase.invoiceUrl}
          mercadoPagoURL={purchase?.payment?.mercadoPagoURL}
          key={pack?.product?.sku}
        />
      </div>
    );
  };

const renderPurchase = (purchase: Purchase) => {
  const PurchaseCardComponent = PurchaseCardComponentFactory(purchase);
  return (
    <div className={styles.purchase} key={purchase.id}>
      {purchase.packs.map(PurchaseCardComponent)}
    </div>
  );
};

const Purchases = () => {
  const { push } = useRouter();
  const onSearch = (query: string) => push(`/?search=${query}`);
  const { loading, isEmpty, data, page, totalPages, onNext, onPrevious } =
    usePurchases();

  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      onSearch={onSearch}
      loading={loading}
    >
      <div className={styles.container}>
        {isEmpty && <p>No tienes compras aún. ¿Que te gustaría comprar?</p>}
        {!isEmpty && (
          <React.Fragment>
            {data?.map(renderPurchase)}
            <Pagination
              page={page}
              totalPages={totalPages}
              onNext={onNext}
              onPrevious={onPrevious}
            />
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};

export default Purchases;
