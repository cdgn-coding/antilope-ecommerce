import { PurchaseStatus } from "./PurchaseStatus";
import { Product } from "./Product";

export interface Purchase {
  id: string;
  amount: number;
  status: PurchaseStatus;
  products: ProductPurchase[];
  createdAt: Date;
  invoiceUrl: string;
}

export interface ProductPurchase {
  amount: number;
  quantity: number;
  product: Product;
}
