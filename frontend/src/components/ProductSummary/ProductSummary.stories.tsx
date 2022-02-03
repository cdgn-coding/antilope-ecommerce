import React from "react";
import ProductSummary, { ProductSummaryProps } from "./ProductSummary";

export default {
  title: "ProductSummary",
  component: ProductSummary,
  argTypes: {
    name: {
      control: { type: "text" },
      defaultValue:
        "Auriculares gamer inalámbricos Golitech G Series G733 lila con luz RGB LED",
    },
    price: {
      control: { type: "number" },
      defaultValue: 7500.0,
    },
    stock: {
      control: { type: "number" },
      defaultValue: 20,
    },
    description: {
      control: { type: "text" },
      defaultValue:
        "¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Golitech G733 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.",
    },
  },
};

export const Default = (args: ProductSummaryProps) => (
  <ProductSummary {...args} />
);
