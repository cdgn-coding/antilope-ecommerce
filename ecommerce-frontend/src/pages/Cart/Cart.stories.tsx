import Cart from "./Cart";
import { ComponentStory } from "@storybook/react";
import getCartSuccessResponse from "./fixtures/getCartSuccessResponse";
import { rest } from "msw";

export default {
  title: "Cart",
  component: Cart,
};

const Template: ComponentStory<typeof Cart> = () => <Cart />;
export const WithProducts = Template.bind({});
WithProducts.parameters = {
  msw: [
    rest.all("/api/cart*", (req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(getCartSuccessResponse));
    }),
  ],
};
