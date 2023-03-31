import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PreviousPageContext from "./PreviousPageContext";

function usePreviousPage() {
  const location = useLocation();
  const previousPage = useRef("/");
  const currentPage = useRef("/");
  const previousPageContext = useContext(PreviousPageContext);
  
  useEffect(() => {
    previousPage.current = currentPage.current;
    currentPage.current = location.pathname;
    previousPageContext.previousPage = previousPage.current;
    previousPageContext.currentPage = currentPage.current;
  }, [location.pathname]);

}

export default usePreviousPage;