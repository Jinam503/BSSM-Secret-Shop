import React from "react";
import styled from "styled-components";

const Purchase = () => {
  return (
    <div>
      <Container>
        <Content>구매창</Content>
      </Container>
    </div>
  );
};

export default Purchase;

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
