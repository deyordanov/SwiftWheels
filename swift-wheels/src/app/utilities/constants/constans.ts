//types
import * as searchContextTypes from "../types/searchContext.types";
import { Range } from "react-date-range";

//Search Context
export const searchContextDefaultValues: searchContextTypes.defaultTypes = {
  searchActive: false,
  setSearchActive: () => {}, //empty func
};

//Date Selection
export const setDateDefaultValues: Range = {
  startDate: new Date(),
  endDate: undefined,
  key: "selection",
};
