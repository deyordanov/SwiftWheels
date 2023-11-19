//types
import React from "react";
import {
    UseFormRegister,
    FieldValues,
    Control,
    UseFormHandleSubmit,
    UseFormSetValue,
} from "react-hook-form";

export type createCarContextDataTypes = {
    animatedComponents: any;
    hoverRating: number;
    carImagesPreview: any[];
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    register: UseFormRegister<FieldValues>;
    control: Control<FieldValues, any>;
    setValue: UseFormSetValue<FieldValues>;
    errors: any;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    onClientUploadComplete: (res: any) => void;
    onSubmit: (data: object) => Promise<void>;
};

export type propTypes = {
    children: React.ReactNode;
};
