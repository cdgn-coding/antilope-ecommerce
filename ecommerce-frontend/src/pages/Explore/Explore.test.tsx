import Explore from "./Explore";
import React from "react";
import { render, act, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import successResponse from "./fixtures/successResponse";

describe("Given Explore Page", () => {
  describe("When the API has products", () => {
    const server = setupServer(
      // Describe the requests to mock.
      rest.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, (req, res, ctx) => {
        return res(ctx.json(successResponse));
      })
    );

    beforeAll(() => {
      server.listen({ onUnhandledRequest: 'warn' });
    });

    afterAll(() => {
      server.close();
    });

    it("Then should render cards for every product", async () => {
      act(() => {
        render(<Explore />)
      });

      await waitFor(() => {
        const productSku = 'ABSOLUTE-BEATS-SOLO3-WIRELESS';
        expect(screen.getByTestId(`product-card-${productSku}`)).toBeTruthy();
      });
    });
  });
});
