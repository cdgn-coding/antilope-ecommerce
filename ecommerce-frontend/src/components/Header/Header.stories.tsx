import Header, { HeaderProps } from './Header';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    searchPlaceholder: {
      type: 'string',
      defaultValue: 'Buscar productos, marcas y más',
    }
  }
};

export const Default = (args: HeaderProps) => {
  return <Header {...args} />;
}