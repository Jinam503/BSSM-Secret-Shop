import React, { useState, useEffect } from "react";
import { useProducts } from "../../components/ProductsContext";
import { useProductPage } from "./hooks/ProductPageHook";
import * as B from "../../styles/BaseStructueStyle";
import * as S from "./style/ProductPageStyle";

const Product = () => {
  const categories = ["전체", "음료", "젤리", "과자", "라면"];
  const { products, setProducts } = useProducts();
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("전체");
  const { fetchProducts, AddProductToCart } = useProductPage(
    setItems,
    products,
    setProducts
  );

  useEffect(() => {
    fetchProducts();
  }, []);
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
