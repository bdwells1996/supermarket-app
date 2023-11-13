// ProductList.tsx
import React, { useEffect, useState } from "react";
import { useBasket } from "../../context/BasketContext";
import ProductDetails from "../ProductDetail/ProductDetail";

import "./ProductList.scss";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  // No need to pass products as a prop if it's fetched internally
}

const ProductList: React.FC<ProductListProps> = () => {
  const { addToBasket } = useBasket();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Run the effect only once when the component mounts

  return (
    <div className="o-wrapper c-products">
      <h2 className="c-products__title">Browse products:</h2>
      <ul className="c-products__items">
        {products.map((product) => (
          <li className="c-products__items__item" key={product.id}>
            <ProductDetails product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
