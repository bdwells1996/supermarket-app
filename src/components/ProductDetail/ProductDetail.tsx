import "./ProductDetail.scss";

import React from "react";
import { useBasket } from "../../context/BasketContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addToBasket } = useBasket();

  const handleAddToBasket = () => {
    addToBasket(product);
  };

  return (
    <div className="c-product-detail">
      <p className="c-product-detail__name">{product.name}</p>
      <p className="c-product-detail__description">{product.description}</p>
      <p className="c-product-detail__price">£{product.price}</p>
      <button
        className="o-btn c-product-detail__btn"
        onClick={handleAddToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
};

export default ProductDetails;
