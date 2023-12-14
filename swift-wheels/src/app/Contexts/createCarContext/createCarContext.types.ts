//types
import React from "react";
import {
    UseFormRegister,
    Control,
    UseFormHandleSubmit,
    UseFormSetValue,
} from "react-hook-form";

export type CreateCarContextDataTypes = {
    animatedComponents: any;
    hoverRating: number;
    carImagesPreview: ImageFileInfo[];
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    register: UseFormRegister<CreateCarFormValues>;
    control: Control<CreateCarFormValues>;
    setValue: UseFormSetValue<CreateCarFormValues>;
    errors: any;
    handleSubmit: UseFormHandleSubmit<CreateCarFormValues>;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    onClientUploadComplete: (res: ImageFileInfo[]) => void;
    onSubmit: (data: CreateCarValues) => Promise<void>;
};

export type ImageFileInfo = {
    fileName: string;
    name: string;
    fileSize: number;
    size: number;
    fileKey: string;
    key: string;
    fileUrl: string;
    url: string;
};

export type PropTypes = {
    children: React.ReactNode;
};

export type CreateCarFormValues = {
    "car-extras": string[];
    "car-images": ImageFileInfo[];
    "car-favorites": string[];
    "car-type": string | null;
    "car-make": string | null;
    "car-transmission": string | null;
    "car-condition": string | null;
    "car-fuel-type": string | null;
    "car-engine-type": string | null;
    "car-drive-type": string | null;
    "car-shop-address": string | null;
    "car-model": string;
    "car-color": string;
    "car-engine-size": string;
    "car-doors": number | string;
    "car-technical-description": string;
    "car-year": number | string;
    "car-horsepower": number | string;
    "car-km": number | string;
    "car-rating": number;
    "car-price": number;
};

export type CreateCarValues = {
    "car-extras": string[];
    "car-images": ImageFileInfo[];
    "car-favorites": string[];
    "car-type": string | null;
    "car-make": string | null;
    "car-transmission": string | null;
    "car-condition": string | null;
    "car-fuel-type": string | null;
    "car-engine-type": string | null;
    "car-drive-type": string | null;
    "car-shop-address": string | null;
    "car-model": string;
    "car-color": string;
    "car-engine-size": string;
    "car-doors": number | string;
    "car-technical-description": string;
    "car-year": number | string;
    "car-horsepower": number | string;
    "car-km": number | string;
    "car-rating": number;
    "car-price": number;
    userId?: string;
    userEmail?: string;
};
