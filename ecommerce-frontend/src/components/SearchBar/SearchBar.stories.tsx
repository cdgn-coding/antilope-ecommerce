// Storybook storie for SearchBar component
import React from 'react';
import SearchBar, { SearchBarProps } from './SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
  argTypes: {
      placeholder: {
        defaultValue: 'Search placeholder',
        control: { type: 'text' },
      }
  }
};

export const SearchBarStory = (args: SearchBarProps) => <SearchBar {...args} />;
  