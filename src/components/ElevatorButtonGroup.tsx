import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import ElevatorButton, { ElevatorButtonType } from "./ElevatorButton";

interface ElevatorButtonGroupProps {
  onClick: (type: ElevatorButtonType, floor: number) => void;
}

const ElevatorButtonGroupContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  columnGap: 20,
});

const ElevatorFloor = styled.select({
  fontSize: 20,
  border: "1px solid #a2a2a2",
  padding: "4px 10px",
  borderRadius: 5,
  transition: "border-color .3s ease",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#000",
  },
});

const ElevatorButtonGroup: React.FC<ElevatorButtonGroupProps> = ({
  onClick,
}) => {
  const [floor, setFloor] = useState(1);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFloor(parseInt(event.currentTarget?.value || "1"));
    },
    [floor]
  );
  const handleClick = useCallback(
    (type: ElevatorButtonType) => {
      onClick(type, floor);
    },
    [floor]
  );

  return (
    <ElevatorButtonGroupContainer>
      <ElevatorFloor onChange={handleChange}>
        {Array.from(Array(9).keys()).map((n) => (
          <option key={n} value={n + 1}>
            {n + 1}F
          </option>
        ))}
      </ElevatorFloor>
      <ElevatorButton type="UP" onClick={handleClick} />
      <ElevatorButton type="DOWN" onClick={handleClick} />
    </ElevatorButtonGroupContainer>
  );
};

export default ElevatorButtonGroup;
