import React from "react";

export type propTypes = {
    setTabs: React.Dispatch<React.SetStateAction<Array<string>>>;
    closeModal: () => void;
};