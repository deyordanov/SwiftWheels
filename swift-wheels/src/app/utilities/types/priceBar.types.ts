//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    initialPrice: string;
    setBarPrice: Dispatch<SetStateAction<number>>;
};
