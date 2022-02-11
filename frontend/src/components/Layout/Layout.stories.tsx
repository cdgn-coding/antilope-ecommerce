import Layout, { LayoutProps } from "./Layout";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";

export default {
  title: "Layout",
  component: Layout,
  argTypes: {
    menuItems: {
      type: "array",
      defaultValue: menuItems,
    },
    secondaryMenuItems: {
      type: "array",
      defaultValue: secondaryMenuItems,
    },
  },
};

export const Default = (args: LayoutProps) => {
  return <Layout {...args} />;
};

export const WithSecondaryMenu = (args: LayoutProps) => {
  return <Layout {...args} withSecondaryMenu />;
};

export const Loading = (args: LayoutProps) => {
  return <Layout {...args} loading />;
};
