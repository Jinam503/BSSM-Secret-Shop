import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <MainContainer>
      <p>이곳은 비밀상점입니다. </p>{" "}
      <p>선생님들한테 들기면 어째될지 모르니 알잘딱하고</p>
      <p>원하는 물품이 있으면 오픈채팅방에 들어와 요청해주세요 ^^</p>
      <a href="https://open.kakao.com/o/gosef8lg">카카오톡 오픈채팅방 링크</a>
      <a>참여코드: sexy</a>
      <img
        style={{ width: "300px" }}
        src={process.env.PUBLIC_URL + "/images/QR.jpg"}
      />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  height: calc(100vh - 450px);
  margin-top: 150px;
`;
