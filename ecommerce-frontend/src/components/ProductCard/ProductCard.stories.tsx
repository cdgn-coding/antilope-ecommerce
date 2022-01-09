// Basic storybook for product card component
import React from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';
import productImage from './fixtures/image.jpg';

export default {
  component: ProductCard,
  title: 'ProductCard',
  argTypes: {
    images: {
      type: 'array',
      defaultValue: [productImage]
    },
    name: {
      defaultValue: 'Auriculares Beats Solo3 Wireless',
      control: { type: 'text' },
    },
    price: {
      defaultValue: 2500,
      control: { type: 'text' },
    }
  }
};

export const ProductCardStory = (args: ProductCardProps) => (<ProductCard {...args} />);