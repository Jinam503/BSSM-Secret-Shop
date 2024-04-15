import React from "react";
import styled from "styled-components";

const Product = () => {
  const items = [
    {
      name: "핫식스 제로",
      price: 1600,
      url: "https://img.danawa.com/prod_img/500000/998/217/img/17217998_1.jpg?_v=20230131144242",
    },
    {
      name: "파워에이드 1.5L",
      price: 3500,
      url: "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157",
    },
    {
      name: "파워에이드 1.5L",
      price: 3500,
      url: "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157",
    },
    {
      name: "파워에이드 1.5L",
      price: 3500,
      url: "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157",
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
  width: 300px;
  height: 300px;
  margin-right: 10px;
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
  padding-top: 150px;
`;

const Container = styled.div`
  background-color: pink;
  display: flex;
  flex-direction: column;
`;
