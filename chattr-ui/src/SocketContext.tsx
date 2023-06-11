import { createContext } from "react";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:80";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
export const SocketContext = createContext({});

export const SocketProvider = (props: any) => {
  return (
    <SocketContext.Provider value={{}}>
      {props.children}
    </SocketContext.Provider>
  )
}