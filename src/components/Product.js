import React from "react";
import styled from "styled-components";

const Product = () => {
  const items = [
    {
      name: "핫식스 제로",
      price: 1600,
      url: "https://img.danawa.com/prod_img/500000/998/217/img/17217998_1.jpg?_v=20230131144242", // 이미지 URL 추가
    },
    {
      name: "파워에이드 1.5L",
      price: 3500,
      url: "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157", // 이미지 URL 추가
    },
    {
      name: "마이구미",
      price: 1200,
      url: "https://i.namu.wiki/i/92RRlnDz7xyxIwTG1R4VleEkIhxoOA3d2y1A1wScZi4VUBL9fLu_msHLOEvVmg_7QhhmDDSnDop4nkn3vkPd9LT7rvYCneuHXGsY-hMXgtGv53-tUBc_KrBqwYqHFTF8PtNAfnGPvyAKtZSA-Mg91g.webp", // 이미지 URL 추가
    },
  ];
  return (
    <div>
      <Container>
        <Content>
          {items.map((item, index) => (
            <Item key={index}>
              <ItemImage src={item.url} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}원</ItemPrice>
              </ItemInfo>
            </Item>
          ))}
        </Content>
      </Container>
    </div>
  );
};

export default Product;

const Item = styled.div`
  display: flex;
  background-color: grey;
  padding: 10px;
  margin: 10px;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 300px; /* 이미지 크기 조정 */
  height: 300px; /* 이미지 크기 조정 */
  margin-right: 10px; /* 이미지와 정보 사이 간격 조정 */
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
  background-color: red;
  padding-top: 150px; /* 헤더 높이만큼 컨텐츠를 아래로 밀어줍니다. */
`;

const Container = styled.div`
  background-color: pink;
  display: flex;
  flex-direction: column;
`;
