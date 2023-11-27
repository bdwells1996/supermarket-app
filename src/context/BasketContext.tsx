import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

// Extend Product to include quantity for items in the basket
interface BasketItem extends Product {
  quantity: number;
}

// Defines the context that will be provided and the arguments that will be passed
export interface BasketContextProps {
  basket: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearBasket: () => void;
}

// Create a context for the basket and initialize it as undefined
const BasketContext = React.createContext<BasketContextProps | undefined>(
  undefined
);

// Creates a hook to reuse basket context
export const useBasket = () => {
  const context = React.useContext(BasketContext);
  // Throw an error if used outside of a BasketProvider
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

// Define the expected props for the BasketProvider component, in this case other react components
export interface BasketProviderProps {
  children: React.ReactNode;
}

// BasketProvider component to manage the state of the shopping basket
export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  // State to manage the basket items, initialized from local storage or an empty array
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  // useEffect hook to save the basket to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Function to add a product to the basket
  const addToBasket = (product: Product) => {
    setBasket((prevBasket) => {
      const itemIndex = prevBasket.findIndex((item) => item.id === product.id);

      if (itemIndex !== -1) {
        // Item already in basket, update quantity
        const updatedBasket = [...prevBasket];
        updatedBasket[itemIndex].quantity += 1;
        return updatedBasket;
      } else {
        // Item not in basket, add with quantity 1
        return [...prevBasket, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the basket
  const removeFromBasket = (productId: number) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.id !== productId)
    );
  };

  // Function to increase the quantity of a product in the basket
  const increaseQuantity = (productId: number) => {
    setBasket((prevBasket) => {
      const updatedBasket = [...prevBasket];
      const itemIndex = updatedBasket.findIndex(
        (item) => item.id === productId
      );

      if (itemIndex !== -1) {
        updatedBasket[itemIndex].quantity += 1;
      }

      return updatedBasket;
    });
  };

  // Function to decrease the quantity of a product in the basket
  const decreaseQuantity = (productId: number) => {
    setBasket((prevBasket) => {
      const updatedBasket = [...prevBasket];
      const itemIndex = updatedBasket.findIndex(
        (item) => item.id === productId
      );

      if (itemIndex !== -1 && updatedBasket[itemIndex].quantity > 1) {
        updatedBasket[itemIndex].quantity -= 1;
      } else {
        // Remove the item if the quantity becomes 0
        updatedBasket.splice(itemIndex, 1);
      }

      return updatedBasket;
    });
  };

  // Function to clear all items from the basket
  const clearBasket = () => {
    setBasket([]);
  };

  // Create the context value with basket state and functions
  const contextValue: BasketContextProps = {
    basket,
    addToBasket,
    removeFromBasket,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
  };

  // Provide the context value to the children components
  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};
