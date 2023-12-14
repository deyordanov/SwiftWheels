//types
import { Dispatch, SetStateAction } from "react";

export type PropTypes = {
    initialPrice: number;
    year: string;
    setChartPrice: Dispatch<SetStateAction<number>>;
};
