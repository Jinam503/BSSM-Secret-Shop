import React, { useState, useEffect } from "react";
import axios from "axios";
import * as B from "../../styles/BaseStructueStyle";
import * as S from "./style/PurchaseStyle";
import { useProducts } from "../../components/ProductsContext";
import { notify } from "../../components/Toast";
import dayjs from "dayjs";

const Purchase = () => {
  const { products, setProducts, totalAmount, setTotalAmount } = useProducts();
  const [productsPrice, setProductsPrice] = useState(0);
  const [deliveryDesired, setDeliveryDesired] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [ordererName, setOrdererName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const isDiscounting = true;
  const disCountPercent = 0.8;

  useEffect(() => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price * product.amount;
    });
    setProductsPrice(totalPrice);
    if (isDiscounting && totalAmount >= 2) {
      setDiscountedPrice(Math.round(totalPrice * (1 - disCountPercent)));
    } else {
      setDiscountedPrice(0);
    }
    setTotalPrice(totalPrice + (deliveryDesired ? 300 : 0));
  }, [products, deliveryDesired]);

  const increaseAmount = (index) => {
    const updatedProducts = [...products];

    if (totalAmount >= 10) {
      notify({
        type: "error",
        text: "상품은 최대 10까지 담을 수 있습니다.",
      });
    } else if (
      updatedProducts[index].amount >= updatedProducts[index].maxStock
    ) {
      notify({
        type: "error",
        text: "재고가 부족합니다.",
      });
    } else {
      updatedProducts[index].amount++;
      setProducts(updatedProducts);
      setTotalAmount(totalAmount + 1);
    }
  };

  const decreaseAmount = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].amount > 1) {
      updatedProducts[index].amount--;
      setProducts(updatedProducts);

      setTotalAmount(totalAmount - 1);
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    const deleteProduct = updatedProducts.splice(index, 1)[0];
    setTotalAmount(totalAmount - deleteProduct.amount);
    setProducts(updatedProducts);
  };
  const AddOrder = () => {
    if (totalAmount <= 0) {
      notify({
        type: "error",
        text: "장바구니에 상품이 없습니다.",
      });
    } else if (ordererName.length <= 0) {
      notify({
        type: "error",
        text: "이름을 입력해주세요.",
      });
    } else if (deliveryAddress.length <= 0 && deliveryDesired) {
      notify({
        type: "error",
        text: "배송지를 입력해주세요.",
      });
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
      const date = dayjs().format("YYYY-MM-DD HH:mm");
      const order = {
        ordererName: ordererName,
        needDelivery: deliveryDesired,
        deliverPlace: deliveryAddress,
        orderDate: date,
        totalPrice: totalPrice - discountedPrice,
        accepted: false,
        productInfos: products.map((p) => {
          return {
            productId: p.id,
            quantity: p.amount,
          };
        }),
      };

      axios
        .post(process.env.REACT_APP_SERVER_URL + "api/add_order", order)
        .then((response) => {
          notify({
            type: "success",
            text: "주문이 성공적으로 완료되었습니다. ",
          });
          setProducts([]);
          setDeliveryDesired(false);
          setOrdererName("");
          setTotalAmount(0);
        })
        .catch((error) => {
          notify({
            type: "error",
            text: "주문을 처리하는 동안 에러가 발생했습니다.",
          });
          console.error("Error while adding order:", error);
        });
    }
  };

  return (
    <div>
      <B.BodyContainer>
        <S.CartDiv>
          <S.CartList>
            {products.map((product, index) => (
              <S.CartItem key={index}>
                <S.ItemImage src={product.url} />
                <S.ItemInformation>
                  <S.BoldText size="25px"> {product.name} </S.BoldText>
                  <S.LightText size="12px">
                    {product.description} / {product.category}
                  </S.LightText>
                  <S.BoldText size="16px">
                    {product.amount * product.price}원
                  </S.BoldText>
                </S.ItemInformation>
                <S.ItemAmountModifyBox>
                  <S.ProductDeleteButton onClick={() => deleteProduct(index)}>
                    삭제
                  </S.ProductDeleteButton>
                  <S.ButtonsBox>
                    <S.AmountAddButton onClick={() => decreaseAmount(index)}>
                      -
                    </S.AmountAddButton>
                    <S.BoldText>{product.amount}</S.BoldText>
                    <S.AmountAddButton onClick={() => increaseAmount(index)}>
                      +
                    </S.AmountAddButton>
                  </S.ButtonsBox>
                </S.ItemAmountModifyBox>
              </S.CartItem>
            ))}
          </S.CartList>
          <S.CartPrice>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                이름 (입금자명과 일치하야 함)
              </S.BoldText>
              <S.TextInput
                value={ordererName}
                onChange={(e) => setOrdererName(e.target.value)}
                type="text"
                placeholder="백진암"
              />
            </S.InputBox>
            <S.PriceBox style={{ marginTop: "20px" }}>
              <S.Price>
                <S.BoldText>총 갯수:</S.BoldText>
                <S.BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {totalAmount}개
                </S.BoldText>
              </S.Price>
              <S.Price>
                <S.BoldText>물품 가격:</S.BoldText>
                <S.BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {productsPrice}원
                </S.BoldText>
              </S.Price>
              {isDiscounting && (
                <S.Price>
                  <S.BoldText>할인 가격</S.BoldText>
                  <S.BoldText
                    style={{
                      marginLeft: "auto",
                    }}
                  >
                    {discountedPrice}원
                  </S.BoldText>
                </S.Price>
              )}
              <S.Price>
                <CheckBox
                  style={{ marginRight: "20px" }}
                  checked={deliveryDesired}
                  onChange={setDeliveryDesired}
                />
                <S.BoldText>배달비:</S.BoldText>
                <S.BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  300원
                </S.BoldText>
              </S.Price>
              <div
                style={{
                  borderBottom: "2px solid #aaaaaa",
                }}
              ></div>
              <S.Price>
                <S.BoldText>총 금액:</S.BoldText>
                <S.BoldText
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {totalPrice - discountedPrice}원
                </S.BoldText>
              </S.Price>
            </S.PriceBox>
            {deliveryDesired && (
              <S.InputBox>
                <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                  호실 (3층만)
                </S.BoldText>
                <S.LightText style={{ margin: "0 0 10px 0" }}>
                  밤 배달 가능 (10시 반 ~ 12시)
                </S.LightText>
                <S.TextInput
                  type="text"
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="309호"
                />
              </S.InputBox>
            )}
            <S.PurchaseButton onClick={AddOrder}>
              <span>
                <S.BoldText style={{ fontSize: "16px" }}>주문하기</S.BoldText>
              </span>
            </S.PurchaseButton>
          </S.CartPrice>
        </S.CartDiv>
      </B.BodyContainer>
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
