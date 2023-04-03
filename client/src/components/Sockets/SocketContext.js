import { createContext } from "react";

const SocketContext = createContext({
  socket: undefined,
  opponent: ""
});

export default SocketContext;