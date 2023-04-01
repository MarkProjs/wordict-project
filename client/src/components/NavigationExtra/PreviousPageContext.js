import { createContext } from "react";

const PreviousPageContext = createContext({
  previousPage: undefined,
  currentPage: undefined
});

export default PreviousPageContext;