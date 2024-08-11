import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Elevator from "./Elevator";
import { ElevatorButtonType } from "./ElevatorButton";

export const socket = io("ws://localhost:5000", {
  path: "/",
  transports: ["websocket"],
  autoConnect: false,
});

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

const ElevatorController: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState<unknown[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value: unknown[]) {
      setEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onEvent);

    socket.connect();

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onEvent);
    };
  }, []);

  const handleOnClick = (name: string, type: ElevatorButtonType) => {
    console.log(name, type);
    socket.timeout(3000).emit("", { name, type });
  };

  return (
    <ElevatorControllerContainer>
      <ElevatorDisplayGroup>
        {Array.from(Array(9).keys()).map((n) => (
          <ElevatorDisplay key={n}>{`${9 - n}F`}</ElevatorDisplay>
        ))}
      </ElevatorDisplayGroup>
      <ElevatorGroup>
        <Elevator name="Elevator1" onClick={handleOnClick} />
        <Elevator name="Elevator2" onClick={handleOnClick} />
      </ElevatorGroup>
    </ElevatorControllerContainer>
  );
};

export default ElevatorController;
