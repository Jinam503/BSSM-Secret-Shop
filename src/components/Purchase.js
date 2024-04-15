import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Purchase = () => {
  const [productsDummy, setProductDummy] = useState([
    {
      name: "파워에이드 1.5L",
      checked: true,
      description: "1.5L / 음료",
      imageUrl:
        "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157",
      price: 3500,
      amount: 10,
    },
    {
      name: "마이구미",
      checked: true,
      description: "60g / 젤리",
      imageUrl:
        "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157",
      price: 1200,
      amount: 3,
    },
    {
      name: "핫식스",
      checked: true,
      description: "380mL / 음료",
      imageUrl:
        "https://img.danawa.com/prod_img/500000/618/104/img/3104618_1.jpg?_v=20180524134157",
      price: 1600,
      amount: 5,
    },
  ]);
  const [productsPrice, setProductsPrice] = useState(10000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryDesired, setDeliveryDesired] = useState(false);

  useEffect(() => {
    let totalPrice = 0;
    productsDummy.forEach((product) => {
      if (product.checked) {
        totalPrice += product.price * product.amount;
      }
    });
    setProductsPrice(totalPrice);
    setTotalPrice(productsPrice + (deliveryDesired ? 300 : 0));
  }, [productsDummy]);

  useEffect(() => {
    let totalPrice = productsPrice + (deliveryDesired ? 300 : 0);
    setTotalPrice(totalPrice);
  }, [productsPrice, deliveryDesired]);

  const toggleProductCheckbox = (index) => {
    const updatedProducts = [...productsDummy];
    updatedProducts[index].checked = !updatedProducts[index].checked;
    setProductDummy(updatedProducts);
  };
  const increaseAmount = (index) => {
    const updatedProducts = [...productsDummy];
    updatedProducts[index].amount++;
    setProductDummy(updatedProducts);
  };

  const decreaseAmount = (index) => {
    const updatedProducts = [...productsDummy];
    if (updatedProducts[index].amount > 1) {
      updatedProducts[index].amount--;
      setProductDummy(updatedProducts);
    }
  };
  const deleteProduct = (index) => {
    const updatedProducts = [...productsDummy];
    updatedProducts.splice(index, 1);
    setProductDummy(updatedProducts);
  };
  return (
    <div>
      <Container>
        <TitleDiv>
          <p style={{ fontSize: "50px", marginBottom: "10px" }}>장바구니</p>
          <div
            style={{
              borderBottom: "2px solid #aaa",
              marginBottom: "10px",
            }}
          />
        </TitleDiv>
        <CartDiv>
          <CartList>
            {productsDummy.map((product, index) => (
              <CartItem key={index}>
                <CheckBox
                  style={{ marginRight: "20px" }}
                  checked={product.checked}
                  onChange={() => toggleProductCheckbox(index)}
                />
                <ItemImage src={product.imageUrl} />
                <ItemInformation>
                  <BoldText size="25px"> {product.name} </BoldText>
                  <LightText size="12px">{product.description}</LightText>
                  <BoldText size="16px">
                    {product.amount * product.price}원
                  </BoldText>
                </ItemInformation>
                <ItemAmountModifyBox>
                  <ProductDeleteButton onClick={() => deleteProduct(index)}>
                    삭제
                  </ProductDeleteButton>
                  <ButtonsBox>
                    <AmountAddButton onClick={() => decreaseAmount(index)}>
                      -
                    </AmountAddButton>
                    <BoldText>{product.amount}</BoldText>
                    <AmountAddButton onClick={() => increaseAmount(index)}>
                      +
                    </AmountAddButton>
                  </ButtonsBox>
                </ItemAmountModifyBox>
              </CartItem>
            ))}
          </CartList>
          <CartPrice>
            <InputBox>
              <BoldText style={{ margin: "10px 0 10px 0" }}>
                이름 (입금자명과 일치하야 함)
              </BoldText>
              <TextInput type="text" placeholder="백진암" />
            </InputBox>
            <PriceBox style={{ marginTop: "20px" }}>
              <Price>
                <BoldText>물품 가격:</BoldText>
                <BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {productsPrice}원
                </BoldText>
              </Price>
              <Price>
                <CheckBox
                  style={{ marginRight: "20px" }}
                  checked={deliveryDesired}
                  onChange={setDeliveryDesired}
                />
                <BoldText>배달비:</BoldText>
                <BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  300원
                </BoldText>
              </Price>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "2px solid #aaa",
                  lineHeight: "0.1em",
                }}
              ></div>
              <Price>
                <BoldText>총 금액:</BoldText>
                <BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {totalPrice}원
                </BoldText>
              </Price>
            </PriceBox>
            {deliveryDesired && (
              <InputBox>
                <BoldText style={{ margin: "10px 0 10px 0" }}>
                  호실 (3층만)
                </BoldText>
                <TextInput type="text" placeholder="309호" />
              </InputBox>
            )}
            <PurchaseButton>주문하기</PurchaseButton>
          </CartPrice>
        </CartDiv>
      </Container>
    </div>
  );
};

export default Purchase;

const CheckBox = ({ children, disabled, checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        style={{ marginRight: "10px" }}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
};

const ProductDeleteButton = styled.button`
  width: 100px;
`;
const ButtonsBox = styled.div`
  display: flex;
  width: 100px;
  background-color: red;
  justify-content: space-between;
`;
const AmountAddButton = styled.button`
  width: 30px;
  height: 2%;
`;
const ItemAmountModifyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 20px;
`;
const ItemInformation = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TextInput = styled.input`
  background: #252c37;
  border-radius: 15px;
  border: 0px;
  color: white;
  border-color: white;
  padding: 15px;
  font-size: 15px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-left: 10px;
  margin-right: 10px;
`;
const PurchaseButton = styled.button`
  background-color: blanchedalmond;
  width: 380px;
  margin-top: 30px;
  height: 50px;
  border-radius: 10px;
  border: none;
`;
const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
const Price = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;
const PriceBox = styled.div`
  border: 2px solid #aaa;
  width: 380px;
  margin-left: 10px;
  margin-right: 10px;
`;
const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
  background-color: lightgray;
  width: 1000px;
`;
const CartDiv = styled.div`
  display: flex;
  width: 1000px;
`;
const CartPrice = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: lightcyan;
`;
const Container = styled.div`
  min-height: calc(100vh - 350px);
  margin-top: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: red;

  /* 하위 요소들이 화면을 채우도록 설정 */
  > * {
    flex-shrink: 1;
  }
`;

const CartList = styled.div`
  flex-direction: column;
  display: flex;
  width: 600px;
  background-color: green;
`;
const CartItem = styled.div`
  display: flex;
  align-items: center;

  background-color: lavender;
  margin: 10px;
  height: 120px;
  width: 580px;
`;

const ItemImage = styled.img`
  margin: 10px;
  width: 100px;
  height: 100px;
`;
