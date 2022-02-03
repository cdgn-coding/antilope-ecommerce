import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Given Pagination Component", () => {
  describe("When the current page is the last one", () => {
    it("then should not render the next page button", () => {
      const { queryAllByTestId } = render(
        <Pagination page={5} totalPages={5} />
      );
      expect(queryAllByTestId("next-page-button")).toHaveLength(0);
    });
  });

  describe("When the current page is the first one", () => {
    it("then should not render the next page button", () => {
      const { queryAllByTestId } = render(
        <Pagination page={1} totalPages={5} />
      );
      expect(queryAllByTestId("previous-page-button")).toHaveLength(0);
    });
  });
});
