import styled from "styled-components";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Purchase from "./components/Purchase";
import Feedback from "./components/Feedback";
import Order from "./components/Order";
import Main from "./components/Main";
import Hidden from "./components/Hidden";

const App = () => {
  console.log(process.env.REACT_APP_SECRET_URL);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/purchase" element={<Purchase />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route
            path={"/" + process.env.REACT_APP_SECRET_URL}
            element={<Hidden />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
