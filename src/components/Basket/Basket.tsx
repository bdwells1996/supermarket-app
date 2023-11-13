// Basket.tsx
import React from "react";
import { useBasket } from "../../context/BasketContext";

const Basket: React.FC = () => {
  const { basket } = useBasket();

  return (
    <div>
      <h2>Basket</h2>
      <ul>
        {basket.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Basket;
