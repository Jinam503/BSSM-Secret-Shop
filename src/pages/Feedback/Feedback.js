import React from "react";
import styled from "styled-components";

const Feedback = () => {
  return (
    <div>
      <Container>
        <Content>피트백</Content>
      </Container>
    </div>
  );
};

export default Feedback;

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
