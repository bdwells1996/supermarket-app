// BasketContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

// Define types for product and basket item
interface Product {
  id: number;
  name: string;
  price: number;
}

interface BasketItem extends Product {
  quantity: number;
}

interface BasketContextProps {
  basket: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextProps | undefined>(undefined);

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

interface BasketProviderProps {
  children: ReactNode;
}

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const addToBasket = (product: Product) => {
    const itemIndex = basket.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      // Item already in basket, update quantity
      const updatedBasket = [...basket];
      updatedBasket[itemIndex].quantity += 1;
      setBasket(updatedBasket);
    } else {
      // Item not in basket, add with quantity 1
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  };

  const removeFromBasket = (productId: number) => {
    const updatedBasket = basket.filter((item) => item.id !== productId);
    setBasket(updatedBasket);
  };

  const increaseQuantity = (productId: number) => {
    const updatedBasket = [...basket];
    const itemIndex = updatedBasket.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      updatedBasket[itemIndex].quantity += 1;
      setBasket(updatedBasket);
    }
  };

  const decreaseQuantity = (productId: number) => {
    const updatedBasket = [...basket];
    const itemIndex = updatedBasket.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      if (updatedBasket[itemIndex].quantity > 1) {
        updatedBasket[itemIndex].quantity -= 1;
        setBasket(updatedBasket);
      } else {
        // Remove the item if the quantity becomes 0
        removeFromBasket(productId);
      }
    }
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
