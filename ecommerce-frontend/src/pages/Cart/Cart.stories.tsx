import Cart from "./Cart";
import { ComponentStory } from "@storybook/react";
import { rest } from "msw";

export default {
  title: "Cart",
  component: Cart,
};

const Template: ComponentStory<typeof Cart> = () => <Cart />;
export const WithProducts = Template.bind({});
WithProducts.parameters = {
  msw: [
    rest.get("/api/cart*", (req, res, ctx) => {
      return res(ctx.delay(500), ctx.json({}));
    }),
  ],
};
