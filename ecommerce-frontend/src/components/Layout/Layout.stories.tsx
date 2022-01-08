import Layout, { LayoutProps } from './Layout';

export default {
  title: 'Layout',
  component: Layout,
};

export const LayoutStory = (args: LayoutProps) => {
  return <Layout {...args} />;
}