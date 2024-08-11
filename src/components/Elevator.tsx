import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { ElevatorButtonType } from "./ElevatorButton";
import ElevatorButtonGroup from "./ElevatorButtonGroup";

const ElevatorContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyItems: "center",
  alignItems: "center",
  rowGap: 40,
  position: "relative",
});

const ElevatorAxisGroup = styled.div({
  display: "flex",
  position: "relative",
  width: "100%",
  flexDirection: "column",
  rowGap: 40,
  padding: "8px 0",
});

const ElevatorAxis = styled.div({
  height: 1,
  backgroundColor: "#cacaca",
});

const ElevatorTitle = styled.h3({
  fontSize: 18,
  fontWeight: 600,
});

interface ElevatorCursorGroupStyledProps {
  y: number;
}

const ElevatorCursorGroup = styled.div<ElevatorCursorGroupStyledProps>(
  ({ y }) => {
    const offset = -8;
    const step = 41;
    const adjustedY = step * y;
    return {
      display: "flex",
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 12,
      transform: `translate(0, -${adjustedY}px)`,
      bottom: offset,
      left: "50%",
      transition: "transform .3s ease",
      margLeft: -50,
    };
  }
);

const ElevatorCursor = styled.div({
  width: 32,
  height: 32,
  backgroundColor: "#000",
  borderRadius: 32,
});

const ElevatorCursorDisplay = styled.div({
  backgroundColor: "#000",
  color: "#fff",
  borderRadius: 8,
  padding: "6px 12px",
  fontWeight: 600,
});

interface ElevatorProps {
  name: string;
  onClick: (name: string, type: ElevatorButtonType) => void;
}

const Elevator: React.FC<ElevatorProps> = ({ name, onClick }) => {
  const [currentY, setCurrentY] = useState<number>(0);
  const handleClick = useCallback(
    (type: ElevatorButtonType) => {
      console.log(type);
      setCurrentY(
        Math.max(Math.min(currentY + (type === "UP" ? 1 : -1), 8), 0)
      );
      onClick(name, type);
    },
    [currentY]
  );
  return (
    <ElevatorContainer>
      <ElevatorAxisGroup>
        {Array.from(Array(9).keys()).map((n) => (
          <ElevatorAxis key={n} />
        ))}
        <ElevatorCursorGroup y={currentY}>
          <ElevatorCursor></ElevatorCursor>
          <ElevatorCursorDisplay>STOP</ElevatorCursorDisplay>
        </ElevatorCursorGroup>
      </ElevatorAxisGroup>
      <ElevatorTitle>{name}</ElevatorTitle>
      <ElevatorButtonGroup onClick={handleClick} />
    </ElevatorContainer>
  );
};

export default Elevator;
