import React from "react";
import { render } from "@testing-library/react";
import ProductSelector from "./ProductSelector";

describe("Given ProductSelector component", () => {
  const props = {
    product: {
      name: "Auriculares Beats Solo3 Wireless",
      price: 2500,
      images: ["http://localhost:3000/images/product-image.jpg"],
    },
    quantity: 1,
    onChangeQuantity: jest.fn(),
    onRemove: jest.fn(),
  };

  describe("When minus button is Clicked", () => {
    it("Then should call onChangeQuantity", () => {
      const { getByTestId } = render(<ProductSelector {...props} />);
      getByTestId("quantity-minus").click();
      expect(props.onChangeQuantity).toHaveBeenCalledWith(0);
    });
  });

  describe("When plus button is Clicked", () => {
    it("Then should call onChangeQuantity", () => {
      const { getByTestId } = render(<ProductSelector {...props} />);
      getByTestId("quantity-plus").click();
      expect(props.onChangeQuantity).toHaveBeenCalledWith(2);
    });
  });

  describe("When remove button is Clicked", () => {
    it("Then should call onRemove", () => {
      const { getByTestId } = render(<ProductSelector {...props} />);
      getByTestId("remove-button").click();
      expect(props.onRemove).toHaveBeenCalled();
    });
  });
});
