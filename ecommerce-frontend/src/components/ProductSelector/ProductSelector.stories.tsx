import ProductSelector, { ProductSelectorProps } from "./ProductSelector";
import productImage from "./fixtures/image.jpg";

export default {
  title: "ProductSelector",
  component: ProductSelector,
  argTypes: {
    product: {
      defaultValue: {
        name: "Auriculares Beats Solo3 Wireless",
        price: 2500,
        images: [productImage],
      },
    },
    quantity: {
      defaultValue: 1,
    },
  },
};

export const Default = (args: ProductSelectorProps) => (
  <ProductSelector {...args} />
);
