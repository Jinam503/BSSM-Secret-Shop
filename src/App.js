import styled from "styled-components";
import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product/Product";
import Purchase from "./pages/Pruchase/Purchase";
import Feedback from "./pages/Feedback/Feedback";
import Order from "./pages/Order/Order";
import Main from "./pages/Main/Main";
import Hidden from "./pages/Hidden/Hidden";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetLoss from "./pages/GetLoss/GetLoss";
const App = () => {
  return (
    <div>
      <HashRouter>
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
          <Route path="/fuck_you" element={<GetLoss />}></Route>
        </Routes>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </HashRouter>
    </div>
  );
};

export default App;
