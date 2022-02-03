import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  subtotal: number;
  shipment: number;
  total: number;
  items: CartItem[];
}
