import React from "react";

export type PropTypes = {
    carPrice: number;
    setOffer: React.Dispatch<React.SetStateAction<number>>;
    setTabs: React.Dispatch<React.SetStateAction<Array<string>>>;
};

export type OnSubmit = {
    offer: string | null;
};
