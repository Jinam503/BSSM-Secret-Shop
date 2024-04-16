import styled from "styled-components";

export const BodyContainer = styled.div`
  min-height: calc(100vh - 450px); // header:150, footer:300
  margin-top: 200px; // header150 + default 50
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #3e3e3e;
  position: relative;
  color: white;
  height: 300px;
`;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
