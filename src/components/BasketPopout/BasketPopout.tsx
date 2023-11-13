import { useEffect, useState } from "react";
import { useBasket } from "../../context/BasketContext";
import "./BasketPopout.scss";

export const BasketPopout = ({ onClose }) => {
  const { basket, increaseQuantity, decreaseQuantity, clearBasket } =
    useBasket();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = basket.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
    };

    calculateTotal();
  }, [basket]);

  if (basket.length === 0) {
    return (
      <div className="c-basket__content">
        <h2 className="c-basket__content__title">Basket</h2>
        <p>Your basket is empty.</p>
        <button className="c-basket__content__close" onClick={onClose}>
          x
        </button>
      </div>
    );
  }

  return (
    <div className="c-basket__content">
      <h2 className="c-basket__content__title">Basket</h2>
      <ul className="c-basket__content__items">
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
      <p>Total: ${total.toFixed(2)}</p>
      <button className="o-btn" onClick={clearBasket}>
        Clear Basket
      </button>
      <button className="c-basket__content__close" onClick={onClose}>
        x
      </button>
    </div>
  );
};
