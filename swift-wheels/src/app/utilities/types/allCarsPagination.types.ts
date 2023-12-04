//types
import { Dispatch } from "react";

export type propTypes = {
    filters: any;
    carsCount: number;
    setPage: Dispatch<number>;
    pageSize: number;
};
