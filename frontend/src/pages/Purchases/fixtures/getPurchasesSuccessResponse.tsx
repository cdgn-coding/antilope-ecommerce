import { Purchase } from "@models/Purchase";
import { PurchaseStatus } from "@models/PurchaseStatus";
import { PaginatedResponse } from "@models/PaginatedResponse";
import headsetRose from "./headsetRose.jpg";
import headsetYellow from "./headsetYellow.jpg";

const getPurchasesSuccessResponse = {
  page: 1,
  totalPages: 2,
  totalItems: 15,
  data: [
    {
      id: "123",
      amount: 7500,
      status: PurchaseStatus.COMPLETED,
      packs: [
        {
          amount: 2500,
          quantity: 2,
          product: {
            name: "Headset Beats Solo3",
            price: 1250,
            sku: "HEADSET-BEATS-SOLO3",
            description: "Headset Beats Solo3",
            stock: 10,
            createdAt: new Date("2020-05-01T00:00:00.000Z"),
            images: [headsetRose],
          },
        },
        {
          amount: 2500,
          quantity: 1,
          product: {
            name: "Auriculares Beats Solo3 Wireless",
            price: 2500,
            sku: "ABSOLUTE-BEATS-SOLO3-WIRELESS",
            description: "Auriculares Beats Solo3 Wireless",
            stock: 10,
            createdAt: new Date("2020-05-01T00:00:00.000Z"),
            images: [headsetYellow],
          },
        },
      ],
      createdAt: new Date(),
    },
  ],
};

export default getPurchasesSuccessResponse;
