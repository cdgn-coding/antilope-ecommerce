import Header, { HeaderProps } from './Header';

export default {
  title: 'Header',
  component: Header,
};

export const HeaderStory = (args: HeaderProps) => {
  return <Header {...args} />;
}