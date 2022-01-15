import Cart from "./Cart";
import { ComponentStory } from "@storybook/react";

export default {
  title: "Cart",
  component: Cart,
};

const Template: ComponentStory<typeof Cart> = () => <Cart />;
export const WithProducts = Template.bind({});
