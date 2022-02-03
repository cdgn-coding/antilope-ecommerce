import { PaginatedResponse } from "@models/PaginatedResponse";
import { Product } from "@models/Product";
import headsetRose from "./headsetRose.jpg";
import smartwatch from "./smartwatch.jpg";
import headsetYellow from "./headsetYellow.jpg";
import { Categories } from "@models/Category";

const uniqueProducts = [
  {
    name: "Auriculares Beats Solo3 Wireless",
    price: 2500,
    sku: "ABSOLUTE-BEATS-SOLO3-WIRELESS",
    description: "Auriculares Beats Solo3 Wireless",
    stock: 10,
    createdAt: new Date("2020-05-01T00:00:00.000Z"),
    images: [headsetRose as any],
    category: Categories.SMALL_APPS,
  },
  {
    name: "Smartwatch Apple Watch Series",
    price: 7900,
    sku: "SMARTWATCH-APPLE-WATCH-SERIES-3",
    description: "Smartwatch Apple Watch Series 3",
    stock: 10,
    createdAt: new Date("2020-05-01T00:00:00.000Z"),
    images: [smartwatch as any],
    category: Categories.SMALL_APPS,
  },
  {
    name: "Headset Beats Solo3",
    price: 7900,
    sku: "HEADSET-BEATS-SOLO3",
    description: "Headset Beats Solo3",
    stock: 10,
    createdAt: new Date("2020-05-01T00:00:00.000Z"),
    images: [headsetYellow as any],
    category: Categories.SMALL_APPS,
  },
];

const successResponse: PaginatedResponse<Product> = {
  page: 1,
  totalPages: 1,
  totalItems: 3,
  data: uniqueProducts,
};

export default successResponse;
