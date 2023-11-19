//types
import React from "react";

type Center = {
    lat: number;
    lng: number;
};

export type carDetailsContextData = {
    car: any;
    center: Center;
    barPrice: number;
    setBarPrice: React.Dispatch<React.SetStateAction<number>>;
    chartPrice: number;
    setChartPrice: React.Dispatch<React.SetStateAction<number>>;
    isOfferModalOpen: boolean;
    setIsOfferModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type propTypes = {
    children: React.ReactNode;
};
