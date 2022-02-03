import CartSummary, { CartSummaryProps } from "./CartSummary";

export default {
  title: "CartSummary",
  component: CartSummary,
  argTypes: {
    subtotal: {
      control: "number",
      defaultValue: 100,
    },
    shipment: {
      control: "number",
      defaultValue: 10,
    },
    total: {
      control: "number",
      defaultValue: 110,
    },
  },
};

export const Default = (args: CartSummaryProps) => <CartSummary {...args} />;
