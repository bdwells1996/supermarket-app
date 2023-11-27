import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
