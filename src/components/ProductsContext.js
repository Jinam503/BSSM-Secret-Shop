import React, { createContext, useState, useContext } from "react";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, totalAmount, setTotalAmount }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
