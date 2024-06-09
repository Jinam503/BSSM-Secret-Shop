import React, { useState, useEffect } from "react";
import axios from "axios";
import { useProducts } from "../../components/ProductsContext";
import * as B from "../../styles/BaseStructueStyle";
import * as S from "./style/HiddenPageStyle";
import { notify } from "../../components/Toast";
import { redirect, useNavigate } from "react-router-dom";

const Hidden = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState();
  const [productName, setProductName] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [limited, setLimited] = useState(false);

  const router = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response1 = await axios.get(
        process.env.REACT_APP_SERVER_URL + "api/10_orders/" + 0
      );
      setOrders(response1.data);

      const response2 = await axios.get(
        process.env.REACT_APP_SERVER_URL + "api/10_orders/" + 1
      );
      setOrders((prevOrders) => [...prevOrders, ...response2.data]);
      setOrders(orders.reverse());
    } catch (error) {
      console.error("Error fetching products:", error);
      notify({
        type: "error",
        text: "주문 정보를 가져오는데 실패했습니다.",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          "admin?key=" +
          localStorage.getItem("accessToken")
      );
      console.log(response);
      if (!response.data) {
        router("/fuck_you");
      }
    })();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify({
        type: "error",
        text: "제품 정보를 가져오는데 실패했습니다.",
      });
    }
  };

  const Reject = (productId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER_URL + "api/delete_order/" + productId
      )
      .then((response) => {
        alert("삭제 성공했습니다");
        window.location.reload();
      })
      .catch((error) => {
        alert("주문 삭제를 처리하는 도중 오류가 발생했습니다.");
        console.error("Error while deleting order:", error);
      });
  };
  const Accept = (productId) => {
    axios
      .put(
        process.env.REACT_APP_SERVER_URL + "api/update_accepted/" + productId
      )
      .then((response) => {
        alert("승인 성공");
        window.location.reload();
      })
      .catch((error) => {
        alert("주문 승인를 처리하는 도중 오류가 발생했습니다.");
        console.error("Error while passing order:", error);
      });
  };
  const deleteProduct = (productId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER_URL + "api/delete_product/" + productId
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        alert("제품 삭제를 처리하는 도중 오류가 발생했습니다.");
        console.error("Error while delete product:", error);
      });
  };
  const AddProduct = () => {
    const product = {
      name: productName,
      category: productCategory,
      description: productDescription,
      imageUrl: productImageUrl,
      price: productPrice,
      stock: 0,
      limited: limited,
    };

    axios
      .post(process.env.REACT_APP_SERVER_URL + "api/add_product", product)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        notify({
          type: "error",
          text: "제품 추가에 실패했습니다.",
        });
        console.error("Error while adding product:", error);
      });
  };
  const modifyAmout = (id) => {
    const amount = prompt("수정할 갯수를 입력하세용.");
    const product = {
      id: id,
      stock: amount,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER_URL + "api/modify_product_amount",
        product
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        notify({
          type: "error",
          text: "제품 제고 수정에 실패했습니다.",
        });
        console.error("Error while modifying product amount:", error);
      });
  };

  return (
    <div>
      <B.BodyContainer>
        <S.Content>
          <S.AddProductDiv>
            <S.TitleDiv>
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>
                제품 추가
              </p>
              <div
                style={{
                  borderBottom: "1px solid #cccccc",
                  marginBottom: "10px",
                }}
              />
            </S.TitleDiv>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                제품 이름
              </S.BoldText>
              <S.TextInput
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                placeholder="핫식스 더킹 제로 355ml"
              />
            </S.InputBox>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                제품 이미지 URL
              </S.BoldText>
              <S.TextInput
                value={productImageUrl}
                onChange={(e) => setProductImageUrl(e.target.value)}
                type="text"
                placeholder="https://image.jpg"
              />
            </S.InputBox>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                제품 카테고리
              </S.BoldText>
              <S.TextInput
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                type="text"
                placeholder="음료"
              />
            </S.InputBox>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                제품 설명
              </S.BoldText>
              <S.TextInput
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                type="text"
                placeholder="355ml"
              />
            </S.InputBox>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                제품 가격
              </S.BoldText>
              <S.TextInput
                value={productPrice}
                inputmode="numeric"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e) => setProductPrice(e.target.value)}
                type="number"
                placeholder="1600"
              />
            </S.InputBox>
            <S.InputBox>
              <S.BoldText style={{ margin: "10px 0 10px 0" }}>
                한정판
              </S.BoldText>
              <S.TextInput
                checked={limited}
                onChange={(e) => setLimited(e.target.checked)}
                type="checkbox"
              />
            </S.InputBox>
            <S.PurchaseButton onClick={AddProduct}>
              <span>
                <S.BoldText style={{ fontSize: "16px" }}>추가하기</S.BoldText>
              </span>
            </S.PurchaseButton>
          </S.AddProductDiv>
          <S.ProductsDiv>
            <S.TitleDiv>
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>
                제품 관리
              </p>
            </S.TitleDiv>
            {products
              .slice()
              .reverse()
              ?.map((product, index) => (
                <S.ProductItem key={product.id} index={index}>
                  <S.ItemImage src={product.imageUrl} alt={product.name} />
                  <S.ItemInfo>
                    <S.BoldText size="16px">{product.name}</S.BoldText>
                    <S.LightText size="12px">
                      {product.category}/{product.description}
                    </S.LightText>
                    <S.LightText>{product.price}원</S.LightText>
                  </S.ItemInfo>
                  <S.ItemStock style={{ marginRight: "15px" }}>
                    <S.LightText>남아있는 재고:&nbsp;</S.LightText>
                    <S.BoldText style={{ fontSize: "18px" }}>
                      {product.stock}
                    </S.BoldText>
                  </S.ItemStock>
                  <S.DeleteFromProductsButton
                    onClick={() => modifyAmout(product.id)}
                  >
                    재고 수정
                  </S.DeleteFromProductsButton>
                  <S.DeleteFromProductsButton
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteProduct(product.id)}
                  >
                    삭제
                  </S.DeleteFromProductsButton>
                </S.ProductItem>
              ))}
          </S.ProductsDiv>
          <S.ItemsDiv>
            <S.TitleDiv>
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>
                주문 관리
              </p>
            </S.TitleDiv>
            {orders
              .slice()
              .reverse()
              ?.map((order, index) => (
                <S.OrderItem key={order.id} index={index}>
                  <S.ItemInfo>
                    <S.ItemName>주문자 이름 : {order.ordererName}</S.ItemName>
                    <S.ItemPrice>총 {order.totalPrice}원</S.ItemPrice>
                    {order.orderedProducts?.map((e, index) => (
                      <S.ItemPrice key={index}>
                        {e.name} - {e.quantity}개
                      </S.ItemPrice>
                    ))}
                  </S.ItemInfo>
                  {!order.accepted && (
                    <S.Buttons>
                      <S.ActionButton
                        style={{ backgroundColor: "#FF7070" }}
                        onClick={() => Reject(order.id)}
                      >
                        거절
                      </S.ActionButton>
                      <S.ActionButton
                        style={{ backgroundColor: "#B1F45B" }}
                        onClick={() => Accept(order.id)}
                      >
                        수락
                      </S.ActionButton>
                    </S.Buttons>
                  )}
                  {order.need_delivery == 1 && (
                    <S.BoldText>{order.deliver_place}</S.BoldText>
                  )}
                </S.OrderItem>
              ))}
          </S.ItemsDiv>
        </S.Content>
      </B.BodyContainer>
    </div>
  );
};

export default Hidden;
