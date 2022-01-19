import React from "react";
import styles from "./PurchaseCard.module.css";
import { PurchaseStatus } from "@models/PurchaseStatus";
import { Product } from "@models/Product";
import Image from "@components/Image";
import Button from "@components/Button";
import Link from "@components/Link";
import { DateTime } from "luxon";

export interface PurchaseCardProps {
  quantity: number;
  product: Product;
  amount: number;
  status: PurchaseStatus;
  createdAt: Date;
  invoiceUrl?: string;
}

type StatusStringMap = Record<PurchaseStatus, string>;

const statusNameMap: StatusStringMap = {
  CREATED: "Creada",
  WAITING_PAYMENT: "Esperando pago",
  COMPLETED: "Pagada",
  DOCUMENTED: "Factura emitida",
  PAYMENT_REJECTED: "Pago rechazado",
  CANCELLED: "Compra cancelada",
};

const PurchaseCard = ({
  product,
  quantity,
  amount,
  status,
  createdAt,
  invoiceUrl,
}: PurchaseCardProps) => {
  const image = product.images[0];
  const formattedDate = DateTime.fromJSDate(createdAt).toLocaleString(
    { ...DateTime.DATE_FULL },
    { locale: "es" }
  );

  const hasInvoice = status === PurchaseStatus.DOCUMENTED && invoiceUrl;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={image} layout="fill" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.purchaseDetail}>
          {quantity} u. por $ {amount}
        </div>
        <div className={styles.purchaseDate}>{formattedDate}</div>
        <div className={styles.purchaseAction}>
          {hasInvoice && (
            <Link href={invoiceUrl} target="_blank">
              <Button type="primary">Ver factura</Button>
            </Link>
          )}
          {!hasInvoice && (
            <Button type="disabled">{statusNameMap[status]}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
