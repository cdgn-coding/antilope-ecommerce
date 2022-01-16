import React from "react";
import ProductDetail, { ProductDetailProps } from "./ProductDetail";

export default {
  title: "ProductDetail",
  component: ProductDetail,
  argTypes: {
    sku: {
      control: "text",
      defaultValue: "AURICULARES-HEADLESS-SOLOQ3",
    },
  },
};

export const Default = (args: ProductDetailProps) => (
  <ProductDetail {...args} />
);
