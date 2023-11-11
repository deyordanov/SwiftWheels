import React from "react";

export type propTypes = {
    carPrice: number;
    setTabs: React.Dispatch<React.SetStateAction<Array<string>>>;
    offer: number;
};
