import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useProducts } from "./ProductsContext";

const Product = () => {
  const { products, setProducts } = useProducts();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios
        .get(process.env.REACT_APP_SERVER_URL + "api/products")
        .then((res) => {
          setItems(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const AddProductToCart = (item) => {
    const index = products.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      // 이미 장바구니에 있는 상품이라면 수량만 증가
      const updatedProducts = [...products];
      if (updatedProducts[index].amount < updatedProducts[index].maxStock) {
        updatedProducts[index].amount++;
        setProducts(updatedProducts);
      } else alert("재고가 부족하노..");
    } else {
      // 장바구니에 없는 상품이라면 새로 추가
      const newItem = {
        id: item.id,
        name: item.name,
        checked: true,
        category: item.category,
        description: item.description,
        url: item.imageUrl,
        price: item.price,
        amount: 1,
        maxStock: item.stock,
      };
      setProducts([...products, newItem]);
    }
    alert("장바구니에 " + item.name + " 추가");
  };

  return (
    <div>
      <Container>
        <Content>
          <TitleDiv>
            <p style={{ fontSize: "50px", marginBottom: "10px" }}>메뉴</p>
            <div
              style={{
                borderBottom: "2px solid #000000",
                marginBottom: "40px",
              }}
            />
          </TitleDiv>
          <ItemsDiv>
            {items.map((item) => (
              <Item key={item.id}>
                <ItemImage src={item.imageUrl} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.price}원</ItemPrice>
                </ItemInfo>
                <ItemStock style={{ marginRight: "15px" }}>
                  <LightText>남아있는 재고:&nbsp;</LightText>
                  <BoldText style={{ fontSize: "18px" }}>{item.stock}</BoldText>
                </ItemStock>
                <AddToCartButton onClick={() => AddProductToCart(item)}>
                  추가
                </AddToCartButton>
              </Item>
            ))}
          </ItemsDiv>
        </Content>
      </Container>
    </div>
  );
};

export default Product;

const ItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 200px;
`;
const AddToCartButton = styled.button`
  width: 70px;
  height: 60px;

  font-size: 16px;

  outline: none;
  background-color: #cccccc;
  border: none;
  border-radius: 8px;
  color: #666666;

  cursor: pointer;

  transition: ease-out 0.25s;

  &:hover {
    background-color: #dddddd;
    transform: scale(1.05);
  }
`;
const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
  width: 1000px;
`;
const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
const ItemStock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 50px;
`;
const Item = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  width: 1000px;
  align-items: center;
  box-shadow: 0px 0px 8px #dedede;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
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
`;

const Container = styled.div`
  min-height: calc(100vh - 350px);
  margin-top: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;

  > * {
    flex-shrink: 1;
  }
`;
