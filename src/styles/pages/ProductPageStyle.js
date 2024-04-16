import styled from "styled-components";

export const ItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AddToCartButton = styled.button`
  width: fit-content;
  height: fit-content;

  padding: 25px;

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
export const TitleDiv = styled.div`
  margin-bottom: 50px;
`;
export const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
export const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
export const ItemStock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 50px;
`;
export const Item = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  width: 800px;
  align-items: center;
  border-top: ${(props) => (props.index === 0 ? "1px solid #cccccc" : "")};
  border-bottom: 1px solid #dddddd;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const ItemPrice = styled.div``;

export const Content = styled.div`
  display: flex;
  width: 1050px;
  gap: 50px;
`;
export const CategoryDiv = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;
export const CategoryItem = styled.div`
  height: ${(props) => (props.isSelected ? "60px" : "50px")};
  display: flex;
  align-items: center;
  border-top: ${(props) => (props.index === 0 ? "1px solid #dddddd" : "")};
  border-bottom: 1px solid #dddddd;
  padding-left: 10px;
  box-shadow: 30px;

  transition: ease-out 0.25s;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#dddddd" : "")};
`;
