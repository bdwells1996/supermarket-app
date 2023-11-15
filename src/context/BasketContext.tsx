import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface BasketItem extends Product {
  quantity: number;
}

export interface BasketContextProps {
  basket: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearBasket: () => void;
}

const BasketContext = React.createContext<BasketContextProps | undefined>(
  undefined
);

export const useBasket = () => {
  const context = React.useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

export interface BasketProviderProps {
  children: React.ReactNode;
}

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    // Initialize basket from local storage or an empty array
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  useEffect(() => {
    // Save basket to local storage whenever it changes
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

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

  const removeFromBasket = (productId: number) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.id !== productId)
    );
  };

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

  const clearBasket = () => {
    setBasket([]);
  };

  const contextValue: BasketContextProps = {
    basket,
    addToBasket,
    removeFromBasket,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};
