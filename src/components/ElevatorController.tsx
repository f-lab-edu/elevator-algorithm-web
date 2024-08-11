import styled from "@emotion/styled";
import Elevator from "./Elevator";

const ElevatorControllerContainer = styled.div({
  display: "flex",
  justifyContent: "start",
});

const ElevatorDisplayGroup = styled.aside({
  display: "flex",
  width: 40,
  flexDirection: "column",
  rowGap: 25,
});

const ElevatorDisplay = styled.p({
  fontWeight: 600,
});

const ElevatorGroup = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  columnGap: 40,
});

const ElevatorController: React.FC = () => (
  <ElevatorControllerContainer>
    <ElevatorDisplayGroup>
      {Array.from(Array(9).keys()).map((n) => (
        <ElevatorDisplay key={n}>{`${9 - n}F`}</ElevatorDisplay>
      ))}
    </ElevatorDisplayGroup>
    <ElevatorGroup>
      <Elevator name="Elevator1" />
      <Elevator name="Elevator2" />
    </ElevatorGroup>
  </ElevatorControllerContainer>
);

export default ElevatorController;
