import React from "react";

export type PropTypes = {
    setTabs: React.Dispatch<React.SetStateAction<Array<string>>>;
    offerPrice: number;
    closeModal: () => void;
};

export type OnSubmit = {
    buyerName: string;
    buyerEmail: string;
    buyerMessage: string;
};
