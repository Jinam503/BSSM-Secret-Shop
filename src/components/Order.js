import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useProducts } from "./ProductsContext";

const Order = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/orders")
        .then((res) => {
          setItems(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div>
      <Container>
        <Content>
          {items.map((order, index) => (
            <Item key={index}>
              <ItemInfo>
                <ItemName>주문자 이름 {order.ordererName}</ItemName>
                <ItemPrice>총 {order.totalPrice}원</ItemPrice>
              </ItemInfo>
            </Item>
          ))}
        </Content>
      </Container>
    </div>
  );
};

export default Order;

const AddToCartButton = styled.button`
  width: 70px;
  height: 60px;
`;

const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
const ItemStock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 50px;
  background-color: lawngreen;
`;
const Item = styled.div`
  display: flex;
  background-color: grey;
  padding: 10px;
  margin: 10px;
  width: 600px;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100 px;
  margin-right: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  font-weight: bold;
`;

const ItemPrice = styled.div``;

const Content = styled.div`
  height: auto;
  min-height: 100%;
  background-color: red;
  padding-top: 150px;
`;

const Container = styled.div`
  min-height: calc(100vh - 300px);
  margin-top: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: red;

  > * {
    flex-shrink: 1;
  }
`;
