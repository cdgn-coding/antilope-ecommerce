import Explore from "./Explore";
import { rest } from "msw";
import successResponse from "./fixtures/successResponse";
import { ComponentStory } from "@storybook/react";

export default {
  title: "Explore",
  component: Explore,
};

const Template: ComponentStory<typeof Explore> = () => <Explore />;
export const WithProducts = Template.bind({});
WithProducts.parameters = {
  msw: [
    rest.get("/api/products*", (req, res, ctx) => {
      return res(ctx.delay(500), ctx.json(successResponse));
    }),
  ],
};
