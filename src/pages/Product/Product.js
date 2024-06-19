import React, { useState, useEffect } from "react";
import { useProducts } from "../../components/ProductsContext";
import axios from "axios";
import { notify } from "../../components/Toast";
import * as B from "../../styles/BaseStructueStyle";
import * as S from "./style/ProductPageStyle";

const Product = () => {
  const categories = ["전체", "음료", "젤리", "과자", "라면"];
  const { products, setProducts, totalAmount, setTotalAmount } = useProducts();
  const [productItems, setproductItems] = useState([]);
  const [filtredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredItems = productItems
      .filter(
        (item) =>
          (category === "전체" || item.category === category) &&
          item.stock !== 0
      )
      .sort((a, b) => {
        if (a.limited && !b.limited) return -1;
        if (!a.limited && b.limited) return 1;
        return b.stock - a.stock;
      });

    setFilteredItems(filteredItems);
  }, [category, productItems]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "api/products_except_limited"
      );
      console.log(response.data);
      setproductItems(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify({
        type: "error",
        text: "제품 정보를 가져오는데 실패했습니다.",
      });
    }
  };
  const AddProductToCart = (item) => {
    const index = products.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      const updatedProducts = [...products];
      if (totalAmount >= 10) {
        notify({
          type: "error",
          text: "상품은 최대 10까지 담을 수 있습니다.",
        });
      } else if (
        updatedProducts[index].amount >= updatedProducts[index].maxStock
      )
        notify({
          type: "error",
          text: "재고가 부족합니다.",
        });
      else {
        updatedProducts[index].amount++;
        setProducts(updatedProducts);
        setTotalAmount(totalAmount + 1);
        notify({
          type: "success",
          text: "장바구니에 " + item.name + "를 추가했습니다.",
        });
      }
    } else {
      if (totalAmount >= 10) {
        notify({
          type: "error",
          text: "상품은 최대 10까지 담을 수 있습니다.",
        });
      } else {
        if (item.stock <= 0) {
          notify({
            type: "error",
            text: "재고가 부족합니다.",
          });
        } else {
          const newItem = {
            id: item.id,
            name: item.name,
            category: item.category,
            description: item.description,
            url: item.imageUrl,
            price: item.price,
            amount: 1,
            maxStock: item.stock,
          };
          setProducts([...products, newItem]);
          setTotalAmount(totalAmount + 1);
          notify({
            type: "success",
            text: "장바구니에 " + item.name + "를 추가했습니다.",
          });
        }
      }
    }
  };

  const adverTiseContent = [
    {
      title: "돈 없어요 ㅠ",
      content: "현재 자금 부족으로 재고 충전이 원활하지 않을 수도 있습니다.",
    },
  ];
  return (
    <div>
      <B.BodyContainer>
        <S.AdvertiseDiv>
          <S.BoldText size="40px">소식</S.BoldText>
          {adverTiseContent.map((e) => (
            <S.AdverTiseItem>
              <S.BoldText size="30px">{e.title}</S.BoldText>
              <S.LightText size="25px">{e.content}</S.LightText>
            </S.AdverTiseItem>
          ))}
        </S.AdvertiseDiv>
        <S.Content>
          <S.CategoryDiv>
            {categories.map((c, index) => (
              <S.CategoryItem
                key={index}
                index={index}
                onClick={() => setCategory(c)}
                isSelected={category === c}
              >
                <S.BoldText size="16px">{c}</S.BoldText>
              </S.CategoryItem>
            ))}
          </S.CategoryDiv>
          <S.ItemsDiv>
            {filtredItems.map((item, index) => (
              <S.Item key={item.id} index={index}>
                <S.ItemImage src={item.imageUrl} alt={item.name} />
                {item.limited && (
                  <img
                    src="https://i.postimg.cc/zGBB0scm/limited-edition-icon.png"
                    alt="한정판아이콘"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "20px",
                    }}
                  />
                )}
                <S.ItemInfo>
                  <S.BoldText size="16px">{item.name}</S.BoldText>
                  <S.LightText size="12px">
                    {item.category}/{item.description}
                  </S.LightText>
                  <S.LightText>{item.price}원</S.LightText>
                </S.ItemInfo>
                <S.ItemStock style={{ marginRight: "15px" }}>
                  <S.LightText>남아있는 재고:&nbsp;</S.LightText>
                  <S.BoldText style={{ fontSize: "18px" }}>
                    {item.stock}
                  </S.BoldText>
                </S.ItemStock>
                <S.AddToCartButton onClick={() => AddProductToCart(item)}>
                  추가
                </S.AddToCartButton>
              </S.Item>
            ))}
          </S.ItemsDiv>
        </S.Content>
      </B.BodyContainer>
    </div>
  );
};

export default Product;
