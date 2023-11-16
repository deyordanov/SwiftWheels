//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    carPrice: number;
    setBarPrice: Dispatch<SetStateAction<number>>;
};
