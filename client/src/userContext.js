import { createContext } from "react";

const userContext = createContext({
  username: undefined,
  email: undefined,
  picture: undefined  
});

export default userContext;