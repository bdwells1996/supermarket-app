import { BasketContextProps } from "../../../context/BasketContext";

export const mockBasketContext: BasketContextProps = {
  basket: [
    { id: 1, name: "Product 1", price: 10, quantity: 2 },
    { id: 2, name: "Product 2", price: 15, quantity: 1 },
  ],
  addToBasket: jest.fn(),
  removeFromBasket: jest.fn(),
  increaseQuantity: jest.fn(),
  decreaseQuantity: jest.fn(),
  clearBasket: jest.fn(),
};
