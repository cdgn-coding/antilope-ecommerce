import { PurchaseStatus } from "./PurchaseStatus";
import { Product } from "./Product";

export interface Purchase {
  id: string;
  amount: number;
  status: PurchaseStatus;
  packs: Pack[];
  createdAt: string;
  invoiceUrl?: string;
}

export interface Pack {
  amount: number;
  quantity: number;
  product: Product;
}
