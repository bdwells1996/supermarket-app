import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BasketProvider } from "../../../context/BasketContext";

import { useBasket } from "../../../context/BasketContext";

import React from "react";
import { BasketPopout } from "../BasketPopout";
import { mockBasketContext } from "./BasketContextMock";

// Mock the useBasket hook
jest.mock("../../../context/BasketContext", () => ({
  useBasket: () => mockBasketContext,
}));

test("renders BasketPopout correctly with items", () => {
  render(
    <BasketProvider>
      <BasketPopout onClose={() => {}} />
    </BasketProvider>
  );

  // Check if the component renders correctly with the items
  expect(screen.getByText("Basket")).toBeInTheDocument();
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 2")).toBeInTheDocument();
  expect(screen.getByText("Total: $35.00")).toBeInTheDocument();
  expect(screen.getByText("Clear Basket")).toBeInTheDocument();
});

test("renders BasketPopout correctly when basket is empty", () => {
  // Mock the useBasket hook to simulate an empty basket
  jest.mock("context/BasketContext", () => ({
    useBasket: () => ({
      basket: [],
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
      clearBasket: jest.fn(),
    }),
  }));

  render(
    <BasketProvider>
      <BasketPopout onClose={() => {}} />
    </BasketProvider>
  );

  // Check if the component renders correctly when the basket is empty
  expect(screen.getByText("Basket")).toBeInTheDocument();
  expect(screen.getByText("Your basket is empty.")).toBeInTheDocument();
  expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  expect(screen.getByText("Clear Basket")).toBeInTheDocument();
});

test("calls increaseQuantity and decreaseQuantity correctly", () => {
  render(
    <BasketProvider>
      <BasketPopout onClose={() => {}} />
    </BasketProvider>
  );
  // Access the functions from the context returned by useBasket
  const { increaseQuantity, decreaseQuantity } = useBasket();

  // Mock the increaseQuantity and decreaseQuantity functions
  const increaseButton = screen.getByText("+");
  const decreaseButton = screen.getByText("-");

  fireEvent.click(increaseButton);
  expect(increaseQuantity).toHaveBeenCalledWith(1);

  fireEvent.click(decreaseButton);
  expect(decreaseQuantity).toHaveBeenCalledWith(1);
});

test("calls clearBasket correctly", () => {
  render(
    <BasketProvider>
      <BasketPopout onClose={() => {}} />
    </BasketProvider>
  );

  const { clearBasket } = useBasket();

  // Mock the clearBasket function
  const clearButton = screen.getByText("Clear Basket");
  fireEvent.click(clearButton);
  expect(clearBasket).toHaveBeenCalled();
});
