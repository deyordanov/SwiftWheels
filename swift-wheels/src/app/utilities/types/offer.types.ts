//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    priceIndicator: number;
    setIsOfferModalOpen: Dispatch<SetStateAction<boolean>>;
};
