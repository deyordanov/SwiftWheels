//types
import React, { MouseEvent } from "react";

export type FilterFormValues = {
    "car-type": string | null;
    "car-make": string | null;
    "car-transmission": string | null;
    "car-condition": string | null;
    "car-fuel-type": string | null;
    "car-engine-type": string | null;
    "car-drive-type": string | null;
    "price-lower-bound": number;
    "price-upper-bound": number;
    "km-lower-bound": number;
    "km-upper-bound": number;
    "horsepower-lower-bound": number;
    "horsepower-upper-bound": number;
};

export type handleFiltersData = FilterFormValues | {};

export type handleClearFilter = MouseEvent<HTMLButtonElement>;

export type AccumulatorElement = {
    key: string;
    value: string | null | number;
    separator: string;
};

export type propTypes = {
    setFilters: React.Dispatch<React.SetStateAction<Array<object>>>;
};
