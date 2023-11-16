//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    carPrice: number;
    isOfferModalOpen: boolean;
    setIsOfferModalOpen: Dispatch<SetStateAction<boolean>>;
};
