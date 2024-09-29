import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import Elevator, { ElevatorStatus, ElevatorStatusValue } from "./Elevator";
import { ElevatorButtonType } from "./ElevatorButton";

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

const camelize = (str: string) =>
  str.toLowerCase().replace(/_([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

const defaultElevatorStatus: { [id: string]: ElevatorStatus } = [1, 1].reduce(
  (acc, floor, idx) => ({
    ...acc,
    [`ELEVATOR${idx + 1}`]: {
      floor,
      id: `ELEVATOR${idx + 1}`,
      step: 0,
      momentum: 0,
      watchList: "",
      status: ElevatorStatusValue.STOP,
    },
  }),
  {}
);

const ElevatorController: React.FC = () => {
  const websocket = useRef<WebSocket | null>(null);
  const [elevators, setElevators] = useState<{ [id: string]: ElevatorStatus }>(
    defaultElevatorStatus
  );

  const eventHandler = useCallback(
    (event: string, id: string, value: string) => {
      if (["FLOOR", "STEP"].includes(event)) {
        const numberValue = parseInt(value);
        setElevators((elevators) => ({
          ...elevators,
          [id]: {
            ...elevators[id],
            [camelize(event)]: numberValue,
          },
        }));
        console.log(elevators);
        return;
      }

      setElevators((elevators) => ({
        ...elevators,
        [id]: {
          ...elevators[id],
          [camelize(event)]: value,
        },
      }));

      console.log("EVENT", camelize(event));
    },
    []
  );

  const handleOnClick = useCallback(
    (name: string, type: ElevatorButtonType, floor: number) => {
      console.log("websocket", websocket);
      try {
        websocket.current?.send(`${name}:${type}:${floor}`);
        console.log(websocket, name, type, floor);
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  useEffect(() => {
    console.log("websocket started");
    websocket.current = new WebSocket("ws://127.0.0.1:5678/");

    websocket.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    websocket.current.onmessage = (event) => {
      const [event_, id, value] = event.data.split(":");
      eventHandler(event_, id, value);
    };

    websocket.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    websocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    const webSocket = websocket.current;

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <ElevatorControllerContainer>
      <ElevatorDisplayGroup>
        {Array.from(Array(9).keys()).map((n) => (
          <ElevatorDisplay key={n}>{`${9 - n}F`}</ElevatorDisplay>
        ))}
      </ElevatorDisplayGroup>
      <ElevatorGroup>
        {Object.entries(elevators).map(([key, value]) => (
          <Elevator
            key={key}
            name={value.id}
            status={value}
            onClick={handleOnClick}
          />
        ))}
      </ElevatorGroup>
    </ElevatorControllerContainer>
  );
};

export default ElevatorController;
