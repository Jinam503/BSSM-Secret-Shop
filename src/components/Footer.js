import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterDiv>
      <p>백진암 운영</p>
      <p>계좌번호: 7777018638354 카카오뱅크</p>
      <p>주문 요청 넣고 계좌로 돈 보내면 승인 해줍니다.</p>
      <p>주문자명과 입금자명이 다르면 거절되니 조심해주세요.</p>
      <p>테러하지 마세요.</p>
      <p>많은 이용 부탁드립니다.</p>
    </FooterDiv>
  );
};

export default Footer;

const FooterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blue;
  flex-direction: column;
  background-color: palegoldenrod;
  position: relative;
  height: 150px;
`;
