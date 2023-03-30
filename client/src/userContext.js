import { createContext } from "react";

const userContext = createContext({
  username: undefined,
  picture: undefined,
  isLoggedIn: false,
  setIsLoggedIn: undefined
});

export default userContext;