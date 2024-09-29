import React from "react";

import styled from "@emotion/styled";

const HeaderContainer = styled.header({
  display: "flex",
  width: "100%",
  height: 60,
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid #a2a2a2",
  boxSizing: "border-box",
});

const HeaderInner = styled.div({
  width: 1440,
  fontSize: 22,
  fontWeight: 900,
  lineHeight: 1,
});

const Header: React.FC = () => (
  <HeaderContainer>
    <HeaderInner>Elevator Controller</HeaderInner>
  </HeaderContainer>
);

export default Header;
