//types
import React from "react";

type Center = {
    lat: number;
    lng: number;
};

export type CarDetailsContextData = {
    car: Car;
    center: Center;
    barPrice: number;
    setBarPrice: React.Dispatch<React.SetStateAction<number>>;
    chartPrice: number;
    setChartPrice: React.Dispatch<React.SetStateAction<number>>;
    isOfferModalOpen: boolean;
    setIsOfferModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PropTypes = {
    children: React.ReactNode;
};

type CarImage = {
    fileName: string;
    name: string;
    fileSize: number;
    size: number;
    fileKey: string;
    key: string;
    fileUrl: string;
    url: string;
};

export type Car = {
    "car-extras": string[];
    "car-images": CarImage[];
    "car-favorites": string[];
    "car-type": string;
    "car-make": string;
    "car-transmission": string;
    "car-condition": string;
    "car-fuel-type": string;
    "car-engine-type": string;
    "car-drive-type": string;
    "car-shop-address": string;
    "car-model": string;
    "car-color": string;
    "car-engine-size": string;
    "car-doors": number;
    "car-technical-description": string;
    "car-year": number;
    "car-horsepower": number;
    "car-km": number;
    "car-rating": number;
    "car-price": number;
    userId: string;
    userEmail: string;
    _createdOn: number;
    _id: string;
};
