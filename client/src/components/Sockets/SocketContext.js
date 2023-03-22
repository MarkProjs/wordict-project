import { createContext } from "react";

const SocketContext = createContext({
  socket: undefined
});

export default SocketContext;