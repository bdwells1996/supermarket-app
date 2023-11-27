import { useState } from "react";
import { Link } from "react-router-dom";
import basketIcon from "../../assets/images/basket-icon.svg";
import heroImg from "../../assets/images/hero-aside-large.png";
import logoImg from "../../assets/images/logo.svg";
import { useBasket } from "../../context/BasketContext";
import { BasketPopout } from "../BasketPopout/BasketPopout";

import React from "react";
import "./Header.scss";

export const Header = () => {
  const { basket } = useBasket();
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <header className="c-header">
      <nav className="c-header__nav">
        <Link to="/">
          <img
            className="c-header__logo"
            src={logoImg}
            alt="Supermarket Logo"
          />
        </Link>
        <button className="c-header__nav__basket" onClick={toggleBasket}>
          <img
            className="c-header__nav__basket__icon"
            src={basketIcon}
            alt=""
          />
          <p className="c-header__nav__basket__total">{basket.length}</p>
        </button>
        {isBasketOpen && <BasketPopout onClose={toggleBasket} />}
      </nav>
      <div className="c-header__content o-wrapper">
        <div className="c-header__content__text">
          <h1 className="c-header__content__text__title">
            You pick the ingredients
          </h1>
          <p className="c-header__content__text__description">
            We'll handle the rest.
          </p>
        </div>
        <div className="c-header__content__img">
          <img src={heroImg} alt="Supermarket hero image" />
        </div>
      </div>
    </header>
  );
};
