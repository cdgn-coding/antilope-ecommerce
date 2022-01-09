import Layout, { LayoutProps } from './Layout';

export default {
  title: 'Layout',
  component: Layout,
};

export const Default = (args: LayoutProps) => {
  return <Layout {...args} />;
}

export const WithSecondaryMenu = (args: LayoutProps) => {
  return <Layout {...args} withSecondaryMenu />;
}

export const Loading = (args: LayoutProps) => {
  return <Layout {...args} loading />;
}