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
        <HeaderDiv>BSSM 비밀 상점</HeaderDiv>
      </Link>
      <MenuContainer>
        <MenuItem
          to="/product"
          activeClassName="active"
          current={location.pathname === "/product"}
        >
          메뉴
        </MenuItem>
        <MenuItem
          to="/purchase"
          activeClassName="active"
          current={location.pathname === "/purchase"}
        >
          구매
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
  height: 150px; /* 헤더 및 메뉴의 총 높이 */
  background-color: palegoldenrod;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px; /* 헤더의 글꼴 크기 조정 */
  font-weight: 1000;
  height: 100px;
  width: 100%;
  background-color: pink;
`;

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0;
  flex: 1;
  text-align: center;
  border-right: 1px solid #ccc;
  transition: background-color 0.3s ease;
  background-color: ${({ current }) => (current ? "red" : "blue")};

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-right: none;
  }

  &.active {
    background-color: #c5e1a5;
  }
`;
