import React from "react";

export type propTypes = {
    carPrice: number;
    setOffer: React.Dispatch<React.SetStateAction<number>>;
    setTabs: React.Dispatch<React.SetStateAction<Array<string>>>;
};
