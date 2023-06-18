import { createContext } from "react";
import io from "socket.io-client";
import { env } from "./Api";

export const socket = io(`${env.VITE_SERVER_URL}:${env.VITE_SOCKET_PORT}`, {
  autoConnect: false,
  secure: true,
});
export const SocketContext = createContext({});

export const SocketProvider = (props: any) => {
  return (
    <SocketContext.Provider value={{}}>
      {props.children}
    </SocketContext.Provider>
  )
}