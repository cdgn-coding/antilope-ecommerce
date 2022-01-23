import React from "react";
import Purchases from "./Purchases";
import { ComponentStory } from "@storybook/react";
import getPurchasesSuccessResponse from "./fixtures/getPurchasesSuccessResponse";
import { rest } from "msw";

export default {
  title: "Purchases",
  component: Purchases,
};

const Template: ComponentStory<typeof Purchases> = () => <Purchases />;
export const WithProduct = Template.bind({});
WithProduct.parameters = {
  msw: [
    rest.get("/api/purchases*", (req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(getPurchasesSuccessResponse));
    }),
  ],
};
