export const AllCategories = '';

export const Categories = {
  'ALL': AllCategories,
  'WHITE': 'WHITE',
  'BROWN': 'BROWN',
  'GRAY': 'GRAY',
  'SMALL_APPS': 'SMALL_APPS',
};

export type Category = typeof Categories[keyof typeof Categories];