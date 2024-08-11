import styled from "@emotion/styled";
import React from "react";
import ElevatorButton, { ElevatorButtonType } from "./ElevatorButton";

interface ElevatorButtonGroupProps {
  onClick: (type: ElevatorButtonType) => void;
}

const ElevatorButtonGroupContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  columnGap: 20,
});

const ElevatorButtonGroup: React.FC<ElevatorButtonGroupProps> = ({
  onClick,
}) => (
  <ElevatorButtonGroupContainer>
    <ElevatorButton type="UP" onClick={onClick} />
    <ElevatorButton type="DOWN" onClick={onClick} />
  </ElevatorButtonGroupContainer>
);

export default ElevatorButtonGroup;
