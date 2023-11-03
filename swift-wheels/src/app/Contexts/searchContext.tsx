"use client";

//hooks
import { createContext, useContext, useState } from "react";

//types
import * as searchContextTypes from "../utilities/types/searchContext.types";

//constants
import { searchContextDefaultValues } from "../utilities/constants/constans";

const searchContext = createContext(searchContextDefaultValues);

export const SearchProvider = ({ children }: searchContextTypes.propTypes) => {
  const [searchActive, setSearchActive] = useState(false);

  const searchContextData = {
    searchActive,
    setSearchActive,
  };

  return (
    <searchContext.Provider value={searchContextData}>
      {children}
    </searchContext.Provider>
  );
};

export const useSearchContext = () => useContext(searchContext);
