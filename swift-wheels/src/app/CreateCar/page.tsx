"use client";

//hooks
import React, { useState } from "react";
import { useAuthContext } from "../Contexts/authContext";

//services
import * as carService from "../../services/carService";

//uploadthing
import { UploadDropzone } from "../utilities/uploadthing";

//react-select
import makeAnimated from "react-select/animated";
import Select, { CSSObjectWithLabel } from "react-select";

//components
import { Star } from "./Star/Star";
import Gallery from "../CarDetails/Gallery/Gallery";

//react-slider
import ReactSlider from "react-slider";

//react-hook-form
import { Controller, useForm } from "react-hook-form";

//next-link
import Link from "next/link";

//next-image
import Image from "next/image";

//types
import {
    carExtras,
    carTypes,
    carMakes,
    carTransmissionTypes,
    carConditions,
    carFuelTypes,
    carEngineTypes,
    carDriveTypes,
    customStyles,
    createCarFormKeys,
    createCarFormDefaultValues,
} from "../utilities/constants/constans";

export default function Page() {
    const animatedComponents = makeAnimated();
    const [hoverRating, setHoverRating] = useState(0);
    const [carImagesPreview, setCarImagesPreview] = useState([]);
    const [price, setPrice] = useState<number>(25000);

    const {
        register,
        control,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: createCarFormDefaultValues,
        mode: "onSubmit",
    });

    const { userId, userEmail } = useAuthContext();

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
        await carService.create({ ...data, userId, userEmail });
    };

    function getSelectControlStype(
        fieldName: string,
        base: CSSObjectWithLabel
    ) {
        return {
            ...base,
            borderColor: errors[fieldName]
                ? "rgb(244, 67, 54)"
                : base.borderColor,
            boxShadow: "none",
            "&:hover": {
                borderColor: errors[fieldName]
                    ? "rgb(244, 67, 54)"
                    : base.borderColor,
            },
        };
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`max-w-[1000px] container text-black p-20 flex flex-col gap-y-2 mx-auto ${
                carImagesPreview.length === 0 ? "justify-center h-screen" : ""
            }`}
        >
            <div className="relative mb-4">
                <h1 className="text-5xl font-extrabold text-center">
                    Create Your Car Offer
                </h1>
                <Link
                    href={"/"}
                    className="absolute cursor-pointer -top-8 left-2"
                >
                    <Image
                        src={"/icons/logo4.png"}
                        width={200}
                        height={200}
                        alt="logo"
                        className=""
                        priority
                    />
                </Link>
            </div>
            <div className="w-full flex gap-x-4">
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_EXTRAS}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            components={animatedComponents}
                            isMulti
                            options={carExtras}
                            className="min-w-[75%]"
                            classNamePrefix="select"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_EXTRAS,
                                        base
                                    ),
                            }}
                            value={carExtras.filter((option) =>
                                (field.value as string[]).includes(option.value)
                            )}
                            onChange={(value) =>
                                field.onChange(
                                    value.map((option) => option.value)
                                )
                            }
                            isOptionDisabled={(option) =>
                                (field.value as string[]).includes(option.value)
                            }
                            placeholder="Select Car Extras..."
                        />
                    )}
                />

                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_TYPE}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carTypes as any}
                            className="w-full"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_TYPE,
                                        base
                                    ),
                            }}
                            placeholder="Car type....."
                        />
                    )}
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_MAKE}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carMakes as any}
                            className="w-[25%]"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_MAKE,
                                        base
                                    ),
                            }}
                            placeholder="Car make....."
                        />
                    )}
                />
                <input
                    {...register(createCarFormKeys.CAR_MODEL, {
                        required: "This field is required!",
                    })}
                    type="text"
                    name={createCarFormKeys.CAR_MODEL}
                    id={createCarFormKeys.CAR_MODEL}
                    placeholder="Model....."
                    className={`placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_MODEL]
                            ? "border-red-500"
                            : ""
                    }`}
                />
                <input
                    {...register(createCarFormKeys.CAR_KM, {
                        required: "This field is required!",
                        validate: (value) =>
                            Number(value) >= 0 ||
                            "The kilometers cannot be a negative number!",
                    })}
                    type="number"
                    name={createCarFormKeys.CAR_KM}
                    id={createCarFormKeys.CAR_KM}
                    placeholder="Kilometers....."
                    className={`placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_KM] ? "border-red-500" : ""
                    }`}
                />
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_TRANSMISSION}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carTransmissionTypes as any}
                            className="grow"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_EXTRAS,
                                        base
                                    ),
                            }}
                            placeholder="Car transmission....."
                        />
                    )}
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_CONDITION}
                    rules={{ required: "This field is required!" }} // This sets the field as required
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carConditions as any}
                            className="w-[25%]"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_CONDITION,
                                        base
                                    ),
                            }}
                            placeholder="Car condition....."
                        />
                    )}
                />
                <input
                    {...register(createCarFormKeys.CAR_YEAR, {
                        required: "This field is required!",
                        min: {
                            message:
                                "We do not sell cars that have been manufactured before 1990!",
                            value: 1960,
                        },
                        max: {
                            message:
                                "We do not sell cars that have been manufactured after 2024!",
                            value: 2024,
                        },
                    })}
                    type="number"
                    name={createCarFormKeys.CAR_YEAR}
                    id={createCarFormKeys.CAR_YEAR}
                    placeholder="Year....."
                    className={`placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_YEAR]
                            ? "border-red-500"
                            : ""
                    }`}
                />
                <input
                    {...register(createCarFormKeys.CAR_COLOR, {
                        required: "This field is required!",
                    })}
                    type="text"
                    name={createCarFormKeys.CAR_COLOR}
                    id={createCarFormKeys.CAR_COLOR}
                    placeholder="Color....."
                    className={`placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_COLOR]
                            ? "border-red-500"
                            : ""
                    }`}
                />
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_FUEL_TYPE}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carFuelTypes as any}
                            className="w-[25%]"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_FUEL_TYPE,
                                        base
                                    ),
                            }}
                            placeholder="Car fuel type....."
                        />
                    )}
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_ENGINE_TYPE}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carEngineTypes as any}
                            className="w-[30%]"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_ENGINE_TYPE,
                                        base
                                    ),
                            }}
                            placeholder="Car engine type....."
                        />
                    )}
                />
                <input
                    {...register(createCarFormKeys.CAR_ENGINE_SIZE, {
                        required: "This field is required!",
                    })}
                    type="text"
                    name={createCarFormKeys.CAR_ENGINE_SIZE}
                    id={createCarFormKeys.CAR_ENGINE_SIZE}
                    placeholder="Engine size....."
                    className={`placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_ENGINE_SIZE]
                            ? "border-red-500"
                            : ""
                    }`}
                />
                <input
                    {...register(createCarFormKeys.CAR_DOORS, {
                        required: "This field is required!",
                        validate: (value) =>
                            Number(value) >= 0 ||
                            "The doors cannot be a negative number!",
                        max: {
                            message: "The doors cannot exceed 4!",
                            value: 4,
                        },
                    })}
                    type="number"
                    name={createCarFormKeys.CAR_DOORS}
                    id={createCarFormKeys.CAR_DOORS}
                    placeholder="Doors....."
                    className={`placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_DOORS]
                            ? "border-red-500"
                            : ""
                    }`}
                />
                <input
                    {...register(createCarFormKeys.CAR_HORSEPOWER, {
                        required: "This field is required!",
                        validate: (value) =>
                            Number(value) >= 0 ||
                            "The horsepower cannot be a negative number!",
                    })}
                    type="number"
                    name={createCarFormKeys.CAR_HORSEPOWER}
                    id={createCarFormKeys.CAR_HORSEPOWER}
                    placeholder="Horsepower....."
                    className={`placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                        errors[createCarFormKeys.CAR_HORSEPOWER]
                            ? "border-red-500"
                            : ""
                    }`}
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_DRIVE_TYPE}
                    rules={{ required: "This field is required!" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            onChange={(option) => field.onChange(option.value)}
                            value={carTransmissionTypes.find(
                                (c) => c.value === field.value
                            )}
                            isMulti={false}
                            components={animatedComponents}
                            options={carDriveTypes as any}
                            className="w-[40%]"
                            styles={{
                                ...customStyles,
                                control: (base) =>
                                    getSelectControlStype(
                                        createCarFormKeys.CAR_DRIVE_TYPE,
                                        base
                                    ),
                            }}
                            placeholder="Car drive type....."
                        />
                    )}
                />
                {/* Add error display? */}
                <div className="w-full flex items-center gap-x-8 bg-gray-50 p-2 rounded-lg">
                    <Controller
                        control={control}
                        name={createCarFormKeys.CAR_PRICE}
                        rules={{ required: "This field is required!" }}
                        render={({ field: { onChange, value } }) => (
                            <ReactSlider
                                className="h-2 w-full flex items-center z-0"
                                thumbClassName="h-6 w-6 rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none"
                                trackClassName="h-2 bg-gray-200"
                                value={typeof value === "number" ? value : 0}
                                onChange={(value) => {
                                    onChange(Number(value));
                                    setPrice(Number(value));
                                }}
                                min={0}
                                max={1000000}
                                step={100}
                            />
                        )}
                    />

                    <div className="w-[32%] text-gray-800">
                        Price: ${price.toLocaleString()}
                    </div>
                </div>
            </div>
            <textarea
                {...register(createCarFormKeys.CAR_TECHNICAL_DESCRIPTION, {
                    required: "This field is required!",
                    minLength: {
                        message:
                            "The technical description should be above 100 characters!",
                        value: 100,
                    },
                    maxLength: {
                        message:
                            "The technical description should be below 1000 characters!",
                        value: 1000,
                    },
                })}
                className={`placeholder-gray-600 focus:outline-none border-gray-400 rounded-lg border min-h-[100px] max-h-[400px] p-2 ${
                    errors[createCarFormKeys.CAR_TECHNICAL_DESCRIPTION]
                        ? "border-red-500"
                        : ""
                }`}
                name={createCarFormKeys.CAR_TECHNICAL_DESCRIPTION}
                id={createCarFormKeys.CAR_TECHNICAL_DESCRIPTION}
                placeholder="Technical description....."
            ></textarea>
            <div className="flex gap-x-2">
                <p>How would you rate your car overall?</p>
                <Controller
                    control={control}
                    name={createCarFormKeys.CAR_RATING}
                    rules={{
                        required: "This field is required!",
                        min: {
                            message: "<- The rating is required!",
                            value: 1,
                        },
                    }}
                    render={({ field }) => (
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <Star
                                    key={index}
                                    filled={
                                        hoverRating >= index ||
                                        (!hoverRating &&
                                            (field?.value as number) >= index)
                                    }
                                    onMouseEnter={() => onMouseEnter(index)}
                                    onMouseLeave={onMouseLeave}
                                    onClick={() => {
                                        field.onChange(index);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                />
                {errors[createCarFormKeys.CAR_RATING] && (
                    <p className="text-red-500 text-lg">
                        {errors[createCarFormKeys.CAR_RATING]?.message}
                    </p>
                )}
            </div>
            <Controller
                control={control}
                name={createCarFormKeys.CAR_IMAGES}
                rules={{ required: "This field is required!" }}
                render={({ field }) => (
                    <UploadDropzone
                        content={{
                            button() {
                                return "Upload Images";
                            },
                            label() {
                                return "Choose or drag and drop your car images!";
                            },
                        }}
                        appearance={{
                            label: "w-full text-blue-400 hover:text-blue-500",
                            allowedContent: "text-sm",
                        }}
                        className={
                            errors[createCarFormKeys.CAR_IMAGES]
                                ? "border-red-500"
                                : ""
                        }
                        endpoint="imageUploader"
                        onClientUploadComplete={onClientUploadComplete}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                )}
            />

            {carImagesPreview.length !== 0 && (
                <Gallery images={carImagesPreview} isPreview={true} />
            )}

            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="py-2 px-4 text-lg bg-blue-400 hover:bg-blue-500 w-[50%] rounded-lg shadow-xl text-white mt-4"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
