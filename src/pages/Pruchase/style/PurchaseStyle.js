import styled from "styled-components";

export const ProductDeleteButton = styled.button`
  width: 100px;
`;
export const ButtonsBox = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
`;
export const AmountAddButton = styled.button`
  width: 30px;
  height: 2%;
`;
export const ItemAmountModifyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 20px;
`;
export const ItemInformation = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const TextInput = styled.input`
  background: #252c37;
  border-radius: 15px;
  border: 0px;
  color: white;
  border-color: white;
  padding: 15px;
  font-size: 15px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
`;
export const PurchaseButton = styled.button`
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
export const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
export const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
export const Price = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;
export const PriceBox = styled.div`
  border: 2px solid #aaaaaa;
  border-radius: 6px;
  width: 380px;
`;
export const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
  width: 1000px;
`;
export const CartDiv = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  margin-bottom: 100px;
`;
export const CartPrice = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CartList = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 10px;
  min-height: 450px;
`;
export const CartItem = styled.div`
  display: flex;
  align-items: center;

  height: 120px;
  width: 580px;
`;

export const ItemImage = styled.img`
  margin: 10px;
  width: 100px;
  height: 100px;
`;
