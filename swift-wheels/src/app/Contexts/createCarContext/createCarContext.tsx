"use client";

//hooks
import React, { createContext, useContext, useState } from "react";
import { useAuthContext } from "../authContext/authContext";

//next-router
import { useRouter } from "next/navigation";

//services
import * as carService from "../../../services/carService";

//react-hook-form
import { useForm } from "react-hook-form";

//react-select
import makeAnimated from "react-select/animated";

//tanstack query
import { useMutation, useQueryClient } from "@tanstack/react-query";

//constants
import {
    createCarFormKeys,
    createCarFormDefaultValues,
} from "../../utilities/constants/constans";

//types
import * as createCarContextTypes from "./createCarContext.types";

const CreateCarContext = createContext<
    createCarContextTypes.CreateCarContextDataTypes | undefined
>(undefined);

export const CreateCarProvider = ({
    children,
}: createCarContextTypes.PropTypes) => {
    const queryClient = useQueryClient();
    const animatedComponents = makeAnimated();
    const router = useRouter();
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [carImagesPreview, setCarImagesPreview] = useState<
        createCarContextTypes.ImageFileInfo[]
    >([]);
    const [price, setPrice] = useState<number>(25000);
    const { userId, userEmail } = useAuthContext();

    const {
        register,
        control,
        setValue,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<createCarContextTypes.CreateCarFormValues>({
        defaultValues: createCarFormDefaultValues,
        mode: "onSubmit",
    });

    const createCarMutation = useMutation({
        mutationFn: (data: createCarContextTypes.CreateCarValues) =>
            carService.create(data),
        onError: (error) => {
            console.log("Error creating the car offer!", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars"],
                exact: false,
            });
        },
    });

    const onMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onClientUploadComplete = (
        res: createCarContextTypes.ImageFileInfo[]
    ) => {
        console.log(JSON.stringify(res));
        setValue(createCarFormKeys.CAR_IMAGES, res);
        setCarImagesPreview(res);
        alert("Upload Completed");
    };

    const onSubmit = async (data: createCarContextTypes.CreateCarValues) => {
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
