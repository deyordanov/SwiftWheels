import React from "react";

export type PropTypes = {
    carPrice: number;
    setTabs: React.Dispatch<React.SetStateAction<Array<string>>>;
    offer: number;
};

export type OnSubmit = {
    "down-payment": string;
    "loan-term": string;
};
