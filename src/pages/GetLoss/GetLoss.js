import React from "react";
import styled, { keyframes } from "styled-components";
import * as B from "../../styles/BaseStructueStyle";
const GetLoss = () => {
  return (
    <B.BodyContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Rotate>꺼져시발롬아</Rotate>
    </B.BodyContainer>
  );
};

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  font-size: 100px;
  color: black;

  animation: ${rotateAnimation} 5s linear infinite;
`;
export default GetLoss;
