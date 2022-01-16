import { Response } from "@models/Response";
import { Cart } from "@models/Cart";
import headsetRose from "./headsetRose.jpg";

const cartSuccessResponse: Response<Cart> = {
  data: {
    id: "1",
    items: [
      {
        product: {
          name: "Auriculares Beats Solo3 Wireless",
          price: 2500,
          sku: "ABSOLUTE-BEATS-SOLO3-WIRELESS",
          description: "Auriculares Beats Solo3 Wireless",
          stock: 10,
          createdAt: new Date("2020-05-01T00:00:00.000Z"),
          images: [headsetRose as any],
        },
        quantity: 2,
      },
    ],
  },
};

export default cartSuccessResponse;
