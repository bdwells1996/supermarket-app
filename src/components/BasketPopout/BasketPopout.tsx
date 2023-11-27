import React, { useEffect, useState } from "react";
import { useBasket } from "../../context/BasketContext";
import "./BasketPopout.scss";

// Defines the expected props for the BasketPopout component
interface BasketPopoutProps {
  onClose: (event: React.MouseEvent) => void;
}

// Define the BasketPopout component using a functional React component, plays nicely with typescript
export const BasketPopout: React.FC<BasketPopoutProps> = ({ onClose }) => {
  // Grabs the necessary functions and actions from the basket context
  const { basket, increaseQuantity, decreaseQuantity, clearBasket } =
    useBasket();

  // State for basket total
  const [total, setTotal] = useState<number>(0);

  // useEffect hook to recalculate the total whenever the basket changes
  useEffect(() => {
    try {
      // Calculates the total price of items in the basket
      const calculateTotal = () => {
        const newTotal = basket.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        // Update the total state with the calculated value
        setTotal(newTotal);
      };

      // Call the calculateTotal function when the basket changes
      calculateTotal();
    } catch (error) {
      // Log an error message if there is an issue loading the basket
      console.error("Error loading basket:", error);
    }
  }, [basket]);

  // Empty state in basket for user context
  if (basket.length === 0) {
    return (
      <div className="c-basket__content">
        <h2 className="c-basket__content__title">Basket</h2>
        <p className="c-basket__content__empty">Your basket is empty.</p>
        <button className="c-basket__content__close" onClick={onClose}>
          x
        </button>
      </div>
    );
  }

  // Render the basket content with item details, quantities, and total
  return (
    <div className="c-basket__content">
      <h2 className="c-basket__content__title">Basket</h2>
      <ul className="c-basket__content__items">
        {/* Map through each item in the basket and render its details */}
        {basket.map((item) => (
          <li className="c-basket__content__items__item" key={item.id}>
            <div className="c-basket__content__items__item__info">
              <p className="c-basket__content__items__item__info__title">
                {item.name}
              </p>
              <p className="c-basket__content__items__item__info__price">
                £{item.price}
              </p>
            </div>
            <div className="c-basket__content__items__item__quantity">
              {/* Display item quantity and controls to adjust it */}
              {item.quantity}
              <div className="c-basket__content__items__item__quantity__controls">
                <button
                  className="o-btn o-btn--circle"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <button
                  className="o-btn o-btn--circle"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Display the total price of items in the basket, used to be dollars due to silly typo */}
      <p className="c-basket__content__total">Total: £{total.toFixed(2)}</p>
      <button className="o-btn" onClick={clearBasket}>
        Clear Basket
      </button>
      <button className="c-basket__content__close" onClick={onClose}>
        x
      </button>
    </div>
  );
};
