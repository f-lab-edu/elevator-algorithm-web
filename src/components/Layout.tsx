import styled from "@emotion/styled";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  overflowY: "auto",
});

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <LayoutContainer>{children}</LayoutContainer>
);

export default Layout;
