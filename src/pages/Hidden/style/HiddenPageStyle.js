import styled from "styled-components";
export const ItemStock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 50px;
`;
export const ProductItem = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  width: 700px;
  align-items: center;
  border-top: ${(props) => (props.index === 0 ? "1px solid #cccccc" : "")};
  border-bottom: 1px solid #cccccc;

  &:hover {
    background-color: #eeeeee;
  }
`;
export const OrderItem = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  width: 500px;
  align-items: center;
  border-top: ${(props) => (props.index === 0 ? "1px solid #cccccc" : "")};
  border-bottom: 1px solid #cccccc;

  &:hover {
    background-color: #eeeeee;
  }
`;
export const DeleteFromProductsButton = styled.button`
  width: fit-content;
  height: fit-content;

  padding: 10px;

  font-size: 16px;

  outline: none;

  background-color: #8d8c9a;
  border: none;
  border-radius: 8px;
  color: white;

  cursor: pointer;

  transition: ease-out 0.25s;

  &:hover {
    transform: scale(1.05);
  }
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
export const ProductsDiv = styled.div`
  margin-bottom: 100px;
`;

export const AddProductDiv = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
export const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
export const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  gap: 50px;
  border: none;
`;
export const ActionButton = styled.button`
  width: 70px;
  height: 50px;
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
// export const SelectInput = styled.select`
//   background: #252c37;
//   border-radius: 15px;
//   border: 0px;
//   color: white;
//   border-color: white;
//   padding: 15px;
//   font-size: 15px;
// `;
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PurchaseButton = styled.button`
  background-color: blanchedalmond;
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
export const ItemsDiv = styled.div`
  margin-bottom: 100px;
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const ItemPrice = styled.div``;

export const Content = styled.div`
  height: auto;
  min-height: 100%;
  display: flex;
  gap: 40px;
  justify-content: center;
`;
