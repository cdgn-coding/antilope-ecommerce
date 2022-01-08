import Button, { ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    children: {
      control: { type: 'text' },
    }
  },
};

export const ButtonStory = (args: ButtonProps) => {
  const { children = 'Click Me' } = args;
  return <Button {...args}>{children}</Button>;
}