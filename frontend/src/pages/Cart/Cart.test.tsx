import React from "react";
import Cart from "./index";
import { render, act, waitFor, screen } from "@testing-library/react";
import getCartSuccessResponse from "./fixtures/getCartSuccessResponse";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("Given Cart", () => {
  const server = setupServer(
    rest.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart*`,
      (req, res, ctx) => {
        return res(ctx.json(getCartSuccessResponse));
      }
    )
  );

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "warn" });
  });

  afterAll(() => {
    server.close();
  });

  it("Then should render the products", async () => {
    act(() => {
      render(<Cart />);
    });
    await waitFor(() => {
      expect(
        screen.getByTestId("product-card-ABSOLUTE-BEATS-SOLO3-WIRELESS")
      ).toBeTruthy();
    });
  });

  it("Then should render the cart summary", async () => {
    act(() => {
      render(<Cart />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("cart-summary")).toBeTruthy();
    });
  });
});
