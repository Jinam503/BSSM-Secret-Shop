import React, { useState, useEffect } from "react";
import { useProducts } from "../../components/ProductsContext";
import axios from "axios";
import { notify } from "../../components/Toast";
import * as B from "../../styles/BaseStructueStyle";
import * as S from "./style/ProductPageStyle";

const Product = () => {
  const categories = ["전체", "음료", "젤리", "과자", "라면"];
  const { products, setProducts } = useProducts();
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("전체");

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
      if (updatedProducts[index].amount < updatedProducts[index].maxStock) {
        updatedProducts[index].amount++;
        setProducts(updatedProducts);
        notify({
          type: "success",
          text: "장바구니에 " + item.name + "를 추가했습니다.",
        });
      } else
        notify({
          type: "error",
          text: "재고가 부족합니다.",
        });
    } else {
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
      notify({
        type: "success",
        text: "장바구니에 " + item.name + "를 추가했습니다.",
      });
    }
  };
  return (
    <div>
      <B.BodyContainer>
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
            {items.map(
              (item, index) =>
                (category === "전체" || item.category === category) && (
                  <S.Item key={item.id} index={index}>
                    <S.ItemImage src={item.imageUrl} alt={item.name} />
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
                )
            )}
          </S.ItemsDiv>
        </S.Content>
      </B.BodyContainer>
    </div>
  );
};

export default Product;
