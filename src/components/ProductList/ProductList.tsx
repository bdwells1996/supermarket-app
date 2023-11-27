// Import necessary dependencies and styles for the component
import React, { useEffect, useState } from "react";
import ProductDetails from "../ProductDetail/ProductDetail";

import "./ProductList.scss";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  // State to store the list of products retrieved from the API
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect hook to fetch products from the API when the component mounts
  useEffect(() => {
    // Function to fetch products from the API, pass into own function outside of useEffect?
    const fetchProducts = async () => {
      try {
        // Make an API request to get the list of products
        const response = await fetch(
          "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
        );

        // Check if the API request was successful
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        // Parse the response data as JSON and update the state with the products
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // Handle errors that may occur during the API request
        console.error("Error fetching products:", error);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []); // Run the effect only once when the component mounts

  // Render the list of products
  return (
    <div className="o-wrapper c-products">
      <h2 className="c-products__title">Browse products:</h2>
      <ul className="c-products__items">
        {/* Map through each product and render ProductDetails component for each */}
        {products.map((product) => (
          <li className="c-products__items__item" key={product.id}>
            <ProductDetails product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the ProductList component as the default export
export default ProductList;
