import styled from "@emotion/styled";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
}

const SectionContainer = styled.div({
  width: 1440,
  padding: "120px 0",
});

const Section: React.FC<SectionProps> = ({ children }) => (
  <SectionContainer>{children}</SectionContainer>
);

export default Section;
