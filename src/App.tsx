import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import { BasketProvider } from "./context/BasketContext";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
