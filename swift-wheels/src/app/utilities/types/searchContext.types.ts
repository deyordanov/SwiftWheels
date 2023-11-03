import { SetStateAction, Dispatch, ReactNode } from "react";

export type propTypes = {
  children: ReactNode;
};

export type defaultTypes = {
  searchActive: boolean;
  setSearchActive: Dispatch<SetStateAction<boolean>>;
};
