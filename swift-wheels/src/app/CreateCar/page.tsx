"use client";

//hooks
import { useCreateCarContext } from "../Contexts/createCarContext";

//uploadthing
import { UploadDropzone } from "../utilities/uploadthing";

//react-select
import Select, { SingleValue } from "react-select";

//components
import { Star } from "./Star/Star";
import Gallery from "../CarDetails/Gallery/Gallery";

//react-form-hook
import { Controller } from "react-hook-form";

//react-slider
import ReactSlider from "react-slider";

//framer-motion
import { motion } from "framer-motion";

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
    shopAddresses,
    customStyles,
    createCarFormKeys,
} from "../utilities/constants/constans";
import React from "react";

//shared
import { getSelectControlType } from "../utilities/shared/shared";

export default function Page() {
    const {
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
    } = useCreateCarContext();

    const customSelectStyles = {
        ...customStyles,
        control: (base: any) => ({
            ...base,
            ...getSelectControlType(errors, createCarFormKeys.CAR_EXTRAS, base),
            transition: "opacity 1000ms cubic-bezier(0.1, 0.7, 1.0, 0.1)",
        }),
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`max-w-[1000px] container text-black p-20 flex flex-col gap-y-2 mx-auto ${
                    carImagesPreview.length === 0
                        ? "justify-center h-screen"
                        : ""
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
                <div className="w-full flex gap-x-4 ">
                    <Controller
                        control={control}
                        name={createCarFormKeys.CAR_EXTRAS}
                        rules={{ required: "This field is required!" }}
                        render={({ field }: { field: any }) => (
                            <Select
                                {...field}
                                components={animatedComponents}
                                isMulti
                                options={carExtras}
                                className="w-full select-hidden-arrows"
                                classNamePrefix="select"
                                styles={customSelectStyles}
                                value={carExtras.filter((option) =>
                                    (field.value as string[]).includes(
                                        option.value
                                    )
                                )}
                                onChange={(value: any) =>
                                    field.onChange(
                                        value.map((option: any) => option.value)
                                    )
                                }
                                isOptionDisabled={(option) =>
                                    (field.value as string[]).includes(
                                        option.value
                                    )
                                }
                                placeholder={"Car extras....."}
                            />
                        )}
                    />
                </div>
                <div className="w-full flex gap-x-4 items-center">
                    <Controller
                        control={control}
                        name={createCarFormKeys.CAR_TYPE}
                        rules={{ required: "This field is required!" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carTypes as any}
                                className="w-full max-w-[30%]"
                                styles={customSelectStyles}
                                placeholder={"Car type....."}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={createCarFormKeys.CAR_SHOP_ADDRESS}
                        rules={{ required: "This field is required!" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={shopAddresses.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={shopAddresses as any}
                                className="w-full"
                                styles={customSelectStyles}
                                placeholder={"Shop....."}
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
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carMakes as any}
                                className="w-[25%]"
                                styles={customSelectStyles}
                                placeholder={"Car make....."}
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
                        placeholder={"Model....."}
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
                        placeholder={"Kilometers....."}
                        className={`placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                            errors[createCarFormKeys.CAR_KM]
                                ? "border-red-500"
                                : ""
                        }`}
                        onChange={(e) => {
                            setValue(
                                createCarFormKeys.CAR_KM,
                                Number(e.target.value)
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name={createCarFormKeys.CAR_TRANSMISSION}
                        rules={{ required: "This field is required!" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carTransmissionTypes as any}
                                className="grow"
                                styles={customSelectStyles}
                                placeholder={"Car transmission....."}
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
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carConditions as any}
                                className="w-[25%]"
                                styles={customSelectStyles}
                                placeholder={"Car condition....."}
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
                        placeholder={"Year....."}
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
                        placeholder={"Color....."}
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
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carFuelTypes as any}
                                className="w-[25%]"
                                styles={customSelectStyles}
                                placeholder={"Car fuel type....."}
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
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carEngineTypes as any}
                                className="w-[30%]"
                                styles={customSelectStyles}
                                placeholder={"Car engine type....."}
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
                        placeholder={"Engine size....."}
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
                                value: 6,
                            },
                        })}
                        type="number"
                        name={createCarFormKeys.CAR_DOORS}
                        id={createCarFormKeys.CAR_DOORS}
                        placeholder={"Doors....."}
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
                        placeholder={"Horsepower....."}
                        className={`placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none ${
                            errors[createCarFormKeys.CAR_HORSEPOWER]
                                ? "border-red-500"
                                : ""
                        }`}
                        onChange={(e) => {
                            setValue(
                                createCarFormKeys.CAR_HORSEPOWER,
                                Number(e.target.value)
                            );
                        }}
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
                                onChange={(
                                    option: SingleValue<
                                        { value: any } | undefined
                                    >
                                ) => {
                                    field.onChange(
                                        option ? option.value : null
                                    );
                                }}
                                value={carTransmissionTypes.find(
                                    (c) => c.value === field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carDriveTypes as any}
                                className="w-[40%]"
                                styles={customSelectStyles}
                                placeholder={"Car drive type....."}
                            />
                        )}
                    />
                    {/* Add error display? */}
                    <div className="w-full flex items-center gap-x-8 bg-gray-50 p-2 rounded-lg text-md">
                        <Controller
                            control={control}
                            name={createCarFormKeys.CAR_PRICE}
                            rules={{ required: "This field is required!" }}
                            render={({ field: { onChange, value } }) => (
                                <ReactSlider
                                    className="h-2 w-full flex items-center z-0"
                                    thumbClassName="h-6 w-6 rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none"
                                    trackClassName="h-2 bg-gray-200"
                                    value={
                                        typeof value === "number" ? value : 0
                                    }
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

                        <div className="w-[34%] text-gray-800">
                            Price: ${price.toLocaleString()}
                        </div>
                    </div>
                </div>
                <motion.textarea
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
                    placeholder={"Technical description....."}
                ></motion.textarea>
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
                                                (field?.value as number) >=
                                                    index)
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
                <div>
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
                </div>

                {carImagesPreview.length !== 0 && (
                    <Gallery
                        images={carImagesPreview}
                        car={{}}
                        isPreview={true}
                    />
                )}

                <div className="w-full flex items-center justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="py-2 px-4 text-lg bg-blue-400 hover:bg-blue-500 w-[25%] rounded-lg shadow-xl text-white mt-4 h-[50px]"
                    >
                        Submit
                    </motion.button>
                </div>
            </form>
        </>
    );
}
