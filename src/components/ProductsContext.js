import React, { createContext, useState, useContext, useEffect } from "react";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      if (product.checked) {
        total += product.amount;
      }
    });
    setTotalAmount(total);
  }, [products]);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, totalAmount, setTotalAmount }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
