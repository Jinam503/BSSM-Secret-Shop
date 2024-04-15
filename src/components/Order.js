import React from "react";
import styled from "styled-components";

const Order = () => {
  return (
    <div>
      <Container>
        <Content>주문 내역</Content>
      </Container>
    </div>
  );
};

export default Order;

const Container = styled.div`
  height: calc(100vh - 300px);
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  color: black;
`;
