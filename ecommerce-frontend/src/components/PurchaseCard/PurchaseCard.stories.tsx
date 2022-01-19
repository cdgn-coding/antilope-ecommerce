import { type } from "os";
import React from "react";
import PurchaseCard, { PurchaseCardProps } from "./PurchaseCard";
import { PurchaseStatus } from "@models/PurchaseStatus";
import image from "./fixtures/image.jpg";

export default {
  title: "PurchaseCard",
  component: PurchaseCard,
  argTypes: {
    quantity: {
      control: { type: "number" },
      defaultValue: 5,
    },
    product: {
      control: { type: "object" },
      defaultValue: {
        name: "Auriculares de alta calidad",
        images: [image],
      },
    },
    amount: {
      control: { type: "number" },
      defaultValue: 100,
    },
    status: {
      control: {
        type: "select",
        options: [Object.values(PurchaseStatus)],
      },
      defaultValue: PurchaseStatus.COMPLETED,
    },
    createdAt: {
      control: { type: "date" },
      defaultValue: new Date(),
    },
    invoiceUrl: {
      type: "string",
      control: { type: "text" },
    },
  },
};

export const WithoutInvoice = (args: PurchaseCardProps) => (
  <PurchaseCard
    {...args}
    status={PurchaseStatus.DOCUMENTED}
    invoiceUrl={"http://www.google.com"}
  />
);
