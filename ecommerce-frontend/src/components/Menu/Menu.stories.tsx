import Menu, { MenuProps } from './Menu';

export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
      items: {
        type: 'array',
        defaultValue: [
            { label: 'Inicio', path: '/' },
            { label: 'Mis compras', path: '/purchases' },
            { label: 'Carrito', path: '/cart' },
        ],
      }
  }
};

export const LayoutStory = (args: MenuProps) => {
  return <Menu {...args} />;
}