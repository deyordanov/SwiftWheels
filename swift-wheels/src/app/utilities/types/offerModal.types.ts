//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    car: {
        type: string;
        make: string;
        name: string;
        model: string;
        price: string;
        stars: number;
        image: string;
        km: string;
        transmission: string;
        condition: string;
        year: string;
        color: string;
        "fuel type": string;
        "engine size": string;
        doors: string;
        cylinders: string;
        horsepower: string;
        "drive type": string;
        extras: string[];
        technicalDescription: string;
    };
    isOfferModalOpen: boolean;
    setIsOfferModalOpen: Dispatch<SetStateAction<boolean>>;
};
