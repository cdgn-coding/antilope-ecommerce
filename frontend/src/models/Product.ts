import { Category } from "./Category";

export interface Product {
  name: string;
  price: number;
  description: string;
  sku: string;
  stock: number;
  images: string[];
  createdAt: Date;
  category: Category;
}
