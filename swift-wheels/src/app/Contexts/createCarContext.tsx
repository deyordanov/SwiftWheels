"use client";

//hooks
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";

//next-router
import { useRouter } from "next/navigation";

//services
import * as carService from "../../services/carService";

//react-hook-form
import { useForm } from "react-hook-form";

//react-select
import makeAnimated from "react-select/animated";

//tanstack query
import { useMutation } from "@tanstack/react-query";

//constants
import {
    createCarFormKeys,
    createCarFormDefaultValues,
} from "../utilities/constants/constans";

//types
import * as createCarContextTypes from "../utilities/types/createCarContext.types";

const CreateCarContext = createContext<
    createCarContextTypes.createCarContextDataTypes | undefined
>(undefined);

export const CreateCarProvider = ({
    children,
}: createCarContextTypes.propTypes) => {
    const animatedComponents = makeAnimated();
    const router = useRouter();
    const [hoverRating, setHoverRating] = useState(0);
    const [carImagesPreview, setCarImagesPreview] = useState([]);
    const [price, setPrice] = useState<number>(25000);
    const { userId, userEmail } = useAuthContext();

    const {
        register,
        control,
        setValue,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: createCarFormDefaultValues,
        mode: "onSubmit",
    });

    const createCarMutation = useMutation({
        mutationFn: (data: any) => carService.create(data),
        onError: (error) => {
            console.log("Error creating the car offer!", error);
        },
    });

    const onMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onClientUploadComplete = (res: any) => {
        setValue(createCarFormKeys.CAR_IMAGES, res);
        setCarImagesPreview(res);
        alert("Upload Completed");
    };

    const onSubmit = async (data: object) => {
        createCarMutation.mutate({ ...data, userId, userEmail });
        reset();
        setCarImagesPreview([]);
        router.push("/");
    };

    const createCarContextData = {
        animatedComponents,
        hoverRating,
        carImagesPreview,
        price,
        setPrice,
        register,
        control,
        setValue,
        errors,
        handleSubmit,
        onMouseEnter,
        onMouseLeave,
        onClientUploadComplete,
        onSubmit,
    };

    return (
        <CreateCarContext.Provider value={createCarContextData}>
            {children}
        </CreateCarContext.Provider>
    );
};

export const useCreateCarContext = () => {
    const context = useContext(CreateCarContext);

    if (context === undefined) {
        throw new Error(
            "useCreateCarContext must be used within an AuthProvider"
        );
    }

    return context;
};
