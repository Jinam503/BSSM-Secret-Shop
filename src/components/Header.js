import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <HeaderDiv>BSSM 비밀 상점 v1.0.2</HeaderDiv>
      </Link>
      <MenuContainer>
        <MenuItem
          to="/product"
          activeClassName="active"
          current={location.pathname === "/product"}
        >
          상품
        </MenuItem>
        <MenuItem
          to="/purchase"
          activeClassName="active"
          current={location.pathname === "/purchase"}
        >
          구매 (장바구니)
        </MenuItem>
        <MenuItem
          to="/order"
          activeClassName="active"
          current={location.pathname === "/order"}
        >
          주문내역
        </MenuItem>
        <MenuItem
          to="/feedback"
          activeClassName="active"
          current={location.pathname === "/feedback"}
        >
          피드백
        </MenuItem>
      </MenuContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 1000;
  height: 100px;
  width: 100%;
  background-color: #ffcbc0;
`;

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0px 6px 8px #dddddd;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0;
  flex: 1;
  text-align: center;
  transition: background-color 0.15s ease;
  background-color: ${({ current }) => (current ? "#eeeeee" : "white")};
  z-index: 1;

  &:hover {
    background-color: #eeeeee;
  }
`;
