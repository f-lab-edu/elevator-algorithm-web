import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export type ElevatorButtonType = "UP" | "DOWN";

interface ElevatorButtonProps {
  onClick: (type: ElevatorButtonType) => void;
}

interface ElevatorButtonProps {
  type: ElevatorButtonType;
}

const ElevatorButtonContainer = styled.button({
  display: "flex",
  width: 48,
  height: 48,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  border: "1px solid #a2a2a2",
  boxSizing: "border-box",
  borderRadius: 24,
  outline: 0,
  cursor: "pointer",
  transition: "background-color .2s ease",
  "&:hover": {
    backgroundColor: "#e1e1e1",
  },
  "&:active": {
    backgroundColor: "#000",
    color: "#fff",
  },
});

const ElevatorButton: React.FC<ElevatorButtonProps> = ({ type, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(type);
  }, [type, onClick]);

  return (
    <ElevatorButtonContainer onClick={handleClick}>
      {type === "UP" ? (
        <RiArrowUpSLine size={20} />
      ) : (
        <RiArrowDownSLine size={20} />
      )}
    </ElevatorButtonContainer>
  );
};
export default ElevatorButton;
