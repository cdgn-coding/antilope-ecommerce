import React from "react";
import ProductDetail, { ProductDetailProps } from "./ProductDetail";
import { ComponentStory } from "@storybook/react";
import getProductSuccessResponse from "./fixtures/getProductSuccessResponse";
import { rest } from "msw";

export default {
  title: "ProductDetail",
  component: ProductDetail,
  argTypes: {
    sku: {
      control: { type: "text" },
      defaultValue: "AURICULARES-HEADLESS-SOLOQ3",
    },
  },
};

const Template: ComponentStory<typeof ProductDetail> = (
  args: ProductDetailProps
) => <ProductDetail {...args} />;
export const WithProduct = Template.bind({});
WithProduct.parameters = {
  msw: [
    rest.get("/api/products*", (req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(getProductSuccessResponse));
    }),
  ],
};
