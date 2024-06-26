import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import * as B from "../../styles/BaseStructueStyle";

const Order = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "api/10_orders/" + page
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []); // 임시적으로 그냥 마지막 10개만

  return (
    <div>
      <B.BodyContainer>
        <Content>
          <TitleDiv>
            <p style={{ fontSize: "50px", marginBottom: "10px" }}>주문</p>
            <div
              style={{
                borderBottom: "2px solid #000000",
                marginBottom: "10px",
              }}
            />
          </TitleDiv>
          <ItemsDiv>
            {items.map((order, index) => (
              <Item key={index}>
                <ItemInfo>
                  <ItemName>
                    <BoldText style={{ fontSize: "22px" }}>
                      {order.ordererName}
                    </BoldText>
                  </ItemName>
                  <ItemPrice>
                    <BoldText style={{ fontSize: "20px" }}>
                      총 {order.totalPrice}원
                    </BoldText>
                  </ItemPrice>
                  {order.orderedProducts.map((e) => (
                    <ItemPrice>
                      {e.name} - {e.quantity}개
                    </ItemPrice>
                  ))}
                </ItemInfo>
                <RightItemInfo>
                  {!order.accepted ? (
                    <BoldText
                      size="18px"
                      style={{ color: "#FF3F3F", marginLeft: "auto" }}
                    >
                      승인 대기 중
                    </BoldText>
                  ) : (
                    <BoldText
                      size="18px"
                      style={{ color: "green", marginLeft: "auto" }}
                    >
                      결제 완료
                    </BoldText>
                  )}
                  <LightText size="12 px">
                    {order.orderDate.replace("T", "    ").slice(0, -3)}
                  </LightText>
                </RightItemInfo>
              </Item>
            ))}
            {loading && <p>로딩...</p>}
            <div id="observer"></div>
          </ItemsDiv>
        </Content>
      </B.BodyContainer>
    </div>
  );
};

export default Order;

const RightItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ItemsDiv = styled.div`
  margin-bottom: 100px;
`;
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
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eeeeee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 7px;
  width: 1000px;
  align-items: center;
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
