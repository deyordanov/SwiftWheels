//types
import { Dispatch } from "react";

export type propTypes = {
    filters: string[];
    carsCount: number;
    setPage: Dispatch<number>;
    pageSize: number;
};
