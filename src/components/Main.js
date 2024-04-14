import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <MainContainer>
      <p>이곳은 비밀상점입니다. </p>{" "}
      <p>
        웹페이지가 완성되기 전까지는 아래 카카오톡 오픈채팅방에 들어오셔서
        주문을 해주시면 감사하겠습니다.
      </p>
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
  height: calc(100vh - 300px); /* 화면 높이 - 헤더 높이 */
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
