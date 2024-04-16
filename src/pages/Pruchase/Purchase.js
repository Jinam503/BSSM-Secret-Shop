import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useProducts } from "../../components/ProductsContext";

const Purchase = () => {
  const { products, setProducts, totalAmount, setTotalAmount } = useProducts();
  const [productsPrice, setProductsPrice] = useState(0);
  const [deliveryDesired, setDeliveryDesired] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [ordererName, setOrdererName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    let totalPrice = 0;
    products.forEach((product) => {
      if (product.checked) {
        totalPrice += product.price * product.amount;
      }
    });
    setProductsPrice(totalPrice);
    setTotalPrice(totalPrice + (deliveryDesired ? 300 : 0));
  }, [products, deliveryDesired]);

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      if (product.checked) {
        total += product.amount;
      }
    });
    setTotalAmount(total);
  }, [products]);

  const toggleProductCheckbox = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].checked = !updatedProducts[index].checked;
    setProducts(updatedProducts);
  };

  const increaseAmount = (index) => {
    const updatedProducts = [...products];

    if (
      updatedProducts[index].amount < updatedProducts[index].maxStock &&
      totalAmount < 10
    ) {
      updatedProducts[index].amount++;
      setProducts(updatedProducts);
    } else {
      alert("상품은 최대 10까지 담을 수 있습니다.");
    }
  };

  const decreaseAmount = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].amount > 1) {
      updatedProducts[index].amount--;
      setProducts(updatedProducts);
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };
  const AddOrder = () => {
    if (totalAmount <= 0) {
      alert("장바구니에 상품이 없습니다");
    } else if (ordererName.length <= 0) {
      alert("이름을 입력해주세요");
    } else if (deliveryAddress.length <= 0 && deliveryDesired) {
      alert("배송지를 입력해주세요");
    } else {
      let orderedProductsStr = "";
      products.forEach((product) => {
        if (product.checked) {
          if (orderedProductsStr !== "") {
            orderedProductsStr += ",";
          }
          orderedProductsStr += `${product.id}:${product.amount}`;
        }
      });

      const order = {
        ordererName: ordererName,
        needDelivery: deliveryDesired,
        deliverPlace: deliveryAddress,
        totalPrice: totalPrice,
        accepted: false,
        orderedProducts: orderedProductsStr,
      };

      axios
        .post(process.env.REACT_APP_SERVER_URL + "api/add_order", order)
        .then((response) => {
          alert("주문이 성공적으로 완료되었습니다!");
          setProducts([]);
          setDeliveryDesired(false);
          setOrdererName("");
        })
        .catch((error) => {
          alert("주문을 처리하는 도중 오류가 발생했습니다.");
          console.error("Error while adding order:", error);
        });
    }
  };

  return (
    <div>
      <Container>
        <TitleDiv>
          <p style={{ fontSize: "50px", marginBottom: "10px" }}>장바구니</p>
          <div
            style={{
              borderBottom: "2px solid #000000",
              marginBottom: "10px",
            }}
          />
        </TitleDiv>
        <CartDiv>
          <CartList>
            {products.map((product, index) => (
              <CartItem key={index}>
                <CheckBox
                  style={{ marginRight: "20px" }}
                  checked={product.checked}
                  onChange={() => toggleProductCheckbox(index)}
                />
                <ItemImage src={process.env.PUBLIC_URL + product.url} />
                <ItemInformation>
                  <BoldText size="25px"> {product.name} </BoldText>
                  <LightText size="12px">
                    {product.description} / {product.category}
                  </LightText>
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
              <TextInput
                value={ordererName}
                onChange={(e) => setOrdererName(e.target.value)}
                type="text"
                placeholder="백진암"
              />
            </InputBox>
            <PriceBox style={{ marginTop: "20px" }}>
              <Price>
                <BoldText>총 갯수:</BoldText>
                <BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {totalAmount}개
                </BoldText>
              </Price>
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
                <TextInput
                  type="text"
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="309호"
                />
              </InputBox>
            )}
            <PurchaseButton onClick={AddOrder}>
              <span>
                <BoldText style={{ fontSize: "16px" }}>주문하기</BoldText>
              </span>
            </PurchaseButton>
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
  cursor: pointer;

  transition: ease-out 0.2s;

  &:hover {
    transform: scale(1.03);
  }
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
  border: 2px solid #000000;
  width: 380px;
  margin-left: 10px;
  margin-right: 10px;
`;
const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
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
  background-color: #fcfcfc;
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

const CartList = styled.div`
  flex-direction: column;
  display: flex;
  width: 600px;
  background-color: #f5f5f5;
`;
const CartItem = styled.div`
  display: flex;
  align-items: center;

  margin: 10px;
  height: 120px;
  width: 580px;
`;

const ItemImage = styled.img`
  margin: 10px;
  width: 100px;
  height: 100px;
`;
