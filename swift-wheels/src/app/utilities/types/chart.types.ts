//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    initialPrice: number;
    year: string;
    setChartPrice: Dispatch<SetStateAction<number>>;
};
