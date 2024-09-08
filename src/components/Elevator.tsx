import styled from "@emotion/styled";
import React, { useCallback } from "react";
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

const ElevatorDebugDisplay = styled.div({
  padding: 20,
  borderRadius: 10,
  backgroundColor: "#efefef",
  lineHeight: 1.6,
});

const ElevatorDebugDisplayList = styled.ul({
  listStyle: "none",
});

const ElevatorDebugDisplayItem = styled.li({
  display: "flex",
  flexDirection: "row",
  columnGap: 20,
});

const ElevatorDebugDisplayTitle = styled.b({
  display: "inline-block",
  minWidth: 240,
  fontWeight: 600,
});

const ElevatorDebugDisplayText = styled.span({
  display: "inline-block",
});

export enum ElevatorStatusValue {
  "DOWN",
  "UP",
  "STOP",
}

export interface ElevatorStatus {
  id: string;
  step: number;
  floor: number;
  momentum: number;
  watchList: string;
  status: ElevatorStatusValue;
}

interface ElevatorProps {
  name: string;
  status: ElevatorStatus;
  onClick: (name: string, type: ElevatorButtonType, floor: number) => void;
}

const Elevator: React.FC<ElevatorProps> = ({ name, status, onClick }) => {
  const handleClick = useCallback((type: ElevatorButtonType, floor: number) => {
    onClick(name, type, floor);
  }, []);

  return (
    <ElevatorContainer>
      <ElevatorAxisGroup>
        {Array.from(Array(9).keys()).map((n) => (
          <ElevatorAxis key={n} />
        ))}
        <ElevatorCursorGroup y={status.floor - 1}>
          <ElevatorCursor></ElevatorCursor>
          <ElevatorCursorDisplay>
            {ElevatorStatusValue[status.status]}
          </ElevatorCursorDisplay>
        </ElevatorCursorGroup>
      </ElevatorAxisGroup>
      <ElevatorTitle>{name}</ElevatorTitle>
      <ElevatorButtonGroup onClick={handleClick} />
      <ElevatorDebugDisplay>
        <ElevatorDebugDisplayList>
          {Object.entries(status).map(([key, value]) => (
            <ElevatorDebugDisplayItem>
              <ElevatorDebugDisplayTitle>{key}</ElevatorDebugDisplayTitle>
              <ElevatorDebugDisplayText>{value}</ElevatorDebugDisplayText>
            </ElevatorDebugDisplayItem>
          ))}
          <ElevatorDebugDisplayItem></ElevatorDebugDisplayItem>
        </ElevatorDebugDisplayList>
      </ElevatorDebugDisplay>
    </ElevatorContainer>
  );
};

export default Elevator;
