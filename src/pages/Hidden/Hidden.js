import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useProducts } from "../../components/ProductsContext";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";

const Hidden = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios
        .get(process.env.REACT_APP_SERVER_URL + "api/orders")
        .then((res) => {
          setItems(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const Reject = (orderId) => {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + "api/delete_order/" + orderId)
      .then((response) => {
        alert("삭제 성공했습니다");
        window.location.reload();
      })
      .catch((error) => {
        alert("주문 삭제를 처리하는 도중 오류가 발생했습니다.");
        console.error("Error while deleting order:", error);
      });
  };
  const Accept = (orderId) => {
    axios
      .put(process.env.REACT_APP_SERVER_URL + "api/update_accepted/" + orderId)
      .then((response) => {
        alert("승인 성공");
        window.location.reload();
      })
      .catch((error) => {
        alert("주문 승인를 처리하는 도중 오류가 발생했습니다.");
        console.error("Error while passing order:", error);
      });
  };
  return (
    <div>
      <Container>
        <Content>
          <TitleDiv>
            <p style={{ fontSize: "50px", marginBottom: "10px" }}>주문 관리</p>
            <div
              style={{
                borderBottom: "2px solid #000000",
                marginBottom: "10px",
              }}
            />
          </TitleDiv>
          {items.map((order) => (
            <Item key={order.id}>
              <ItemInfo>
                <ItemName>주문자 이름: {order.ordererName}</ItemName>
                <ItemPrice>총 {order.totalPrice}원</ItemPrice>
                {order.orderedProducts.map((e) => (
                  <ItemPrice>
                    {e.name} - {e.amount}개
                  </ItemPrice>
                ))}
              </ItemInfo>
              {!order.accepted && (
                <Buttons>
                  <ActionButton
                    style={{ backgroundColor: "#FF7070" }}
                    onClick={() => Reject(order.id)}
                  >
                    거절
                  </ActionButton>
                  <ActionButton
                    style={{ backgroundColor: "#B1F45B" }}
                    onClick={() => Accept(order.id)}
                  >
                    수락
                  </ActionButton>
                </Buttons>
              )}
            </Item>
          ))}
        </Content>
      </Container>
    </div>
  );
};

export default Hidden;

const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
  width: 1000px;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  border: none;
`;
const ActionButton = styled.button`
  background-color: red;
  width: 70px;
  height: 50px;
`;
const Item = styled.div`
  display: flex;
  background-color: #eeeeee;
  padding: 10px;
  margin: 10px;
  width: 600px;
  align-items: center;
  justify-content: space-between;
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
  padding-top: 150px;
`;

const Container = styled.div`
  min-height: calc(100vh - 300px);
  margin-top: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;

  > * {
    flex-shrink: 1;
  }
`;
