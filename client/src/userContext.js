import { createContext } from "react";


const userContext = createContext({
  username: undefined,
  picture: undefined,
  isLoggedIn: undefined,
  setIsLoggedIn: undefined
});

export default userContext;