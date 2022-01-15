import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
