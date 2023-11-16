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

//react-slider
import ReactSlider from "react-slider";

//react-hook-form
import { Controller, useForm } from "react-hook-form";

type IOption = {
    value: string;
    label: string;
};

const luxuryCarExtras: IOption[] = [
    "Heated and ventilated seats",
    "Leather upholstery",
    "Massaging seats",
    "Customizable ambient lighting",
    "Panoramic sunroof",
    "Premium sound system",
    "Rear-seat entertainment systems",
    "Noise-canceling cabin",
    "Automated parking systems",
    "Heads-up display",
    "Wireless charging pads",
    "WiFi hotspot",
    "Voice-activated controls",
    "Advanced navigation system",
    "Adaptive cruise control",
    "Lane departure warning",
    "Lane keeping assist",
    "Blind spot monitoring",
    "Rear cross traffic alert",
    "Automatic emergency braking",
    "Pedestrian detection",
    "Road sign recognition",
    "Night vision cameras",
    "Soft-close doors",
    "Automatic trunk lift",
    "Keyless entry and start",
    "Remote start",
    "Multi-zone climate control",
    "Air quality control system",
    "Heated steering wheel",
    "Power-adjustable steering column",
    "Memory settings for seats, steering wheel, and mirrors",
    "Digital rearview mirror",
    "360-degree camera system",
    "Adaptive suspension",
    "Electronic limited-slip differential",
    "Active rear spoiler",
    "Carbon-fiber interior accents",
    "Illuminated door sills",
    "Suede headliner",
    "Gesture control infotainment",
    "Retractable infotainment screens",
    "In-car fridge",
    "Picnic tables",
    "Handcrafted marquetry",
    "Bespoke audio systems",
    "Fingerprint scanners",
    "Facial recognition",
    "Aromatherapy systems",
    "Crystal gearshift knobs",
    "Titanium exhaust systems",
    "Personalized badging",
    "Coach doors",
    "Convertible roof systems",
    "Solar panel roof",
    "Diamond-quilted seats",
    "Custom paint options",
    "Monogrammed upholstery",
    "Executive rear seating",
    "Chauffeur package",
    "Bulletproofing",
    "Fire suppression systems",
    "Run-flat tires",
    "Automatic tire inflation",
    "Dynamic all-wheel steering",
    "Electric turbocharging",
    "Plug-in hybrid system",
    "Hydrophobic windows",
    "Self-cleaning systems",
    "Active grille shutters",
    "Variable compression engines",
    "Electrochromic glass",
    "Autonomous driving features",
    "Biometric vehicle access",
    "Customizable dashboard displays",
    "Dynamic performance modes",
    "Active aerodynamics",
    "Laser headlights",
    "OLED tail lights",
    "Acoustic glass",
    "Heated armrests",
    "Windshield display",
    "Driver fatigue detection system",
    "Active noise control",
    "Hand-stitched leather dashboards",
    "Turbocharged engines",
    "Hybrid drivetrains",
    "Engraved glassware",
    "Silver-plated controls",
    "Personalized tread plates",
    "Active chassis control",
    "Power rear sunshade",
    "Privacy curtains",
    "Seatbelt pretensioners",
    "Carbon-ceramic brakes",
    "Intelligent glass break sensors",
    "Vehicle tracking systems",
    "High-end floor mats",
    "Illuminated vanity mirrors",
    "Personal assistant services",
    "Concierge services",
    "Premium car care kits",
    "Monogrammed car covers",
    "Advanced telemetry systems",
    "Customizable exhaust sound",
    "Luxury key fobs",
    "Hand-polished finish",
    "Cooled glove box",
    "Bespoke roof linings",
    "Door handle welcome lights",
].map((extra) => ({ value: extra, label: extra }));

const carTypes: IOption[] = [
    "Sedan",
    "Coupe",
    "Sports Car",
    "Station Wagon",
    "Hatchback",
    "Convertible",
    "SUV",
    "Minivan",
    "Pickup Truck",
    "Luxury Car",
    "Electric Car",
    "Hybrid Car",
    "Off-Road Vehicle",
    "Crossover",
    "Compact Car",
    "Subcompact Car",
    "Roadster",
    "Light Truck",
    "Van",
    "Microcar",
].map((type) => ({ value: type, label: type }));

const carMakes: IOption[] = [
    "Toyota",
    "Volkswagen",
    "Ford",
    "Mercedes-Benz",
    "BMW",
    "Honda",
    "Chevrolet",
    "Lexus",
    "Audi",
    "Hyundai",
    "Nissan",
    "Porsche",
    "Jeep",
    "Kia",
    "Subaru",
    "Tesla",
    "Ferrari",
    "Lamborghini",
    "Volvo",
    "Cadillac",
    "Bentley",
    "Rolls-Royce",
    "Land Rover",
    "Jaguar",
    "Aston Martin",
    "Maserati",
    "Bugatti",
    "McLaren",
    "Alfa Romeo",
    "Infiniti",
].map((brand) => ({ value: brand, label: brand }));

const transmissionTypes: IOption[] = [
    "Automatic",
    "Manual",
    "Semi-Automatic",
    "DCT",
    "Tiptronic",
    "DSG",
    "AMT",
    "SMG",
    "TCA",
].map((transmission) => ({ value: transmission, label: transmission }));

const carConditions: IOption[] = [
    "New",
    "Used",
    "Crashed",
    "In need of repair",
].map((condition) => ({ value: condition, label: condition }));

const carFuelTypes: IOption[] = [
    "Gasoline",
    "Diesel",
    "Electric",
    "Hybrid",
    "Hybrid",
    "Flex-Fuel",
    "Hydrogen",
    "CNG",
    "LPG",
    "Ethanol",
    "Biodiesel",
    "Methanol",
].map((fuelType) => ({ value: fuelType, label: fuelType }));

const carEngineTypes: IOption[] = [
    "Inline",
    "V-Type",
    "Flat (Boxer)",
    "W-Type",
    "Rotary (Wankel)",
    "Electric Motor",
    "Hybrid",
    "Hydrogen",
    "Steam",
    "Two-Stroke",
    "Four-Stroke",
    "Opposed Piston",
    "Single Cylinder",
    "Twin Cylinder",
    "Triple Cylinder",
    "Four Cylinder",
    "Five Cylinder",
    "Six Cylinder",
    "Eight Cylinder",
    "Ten Cylinder",
    "Twelve Cylinder",
    "Sixteen Cylinder",
].map((engineType) => ({ value: engineType, label: engineType }));

const carDriveTypes: IOption[] = [
    "AWD",
    "4WD",
    "FWD",
    "RWD",
    "4x4",
    "6WD",
    "8WD",
].map((driveType) => ({ value: driveType, label: driveType }));

const customStyles = {
    option: (
        styles: object,
        {
            isFocused,
            isSelected,
            isDisabled,
        }: { isFocused: boolean; isSelected: boolean; isDisabled: boolean }
    ) => ({
        ...styles,
        backgroundColor: isDisabled
            ? "white"
            : isSelected
            ? "white"
            : isFocused
            ? "rgb(227, 227, 227)"
            : undefined,
        color: isDisabled ? "#A9A9A9" : isSelected ? "black" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
        borderRadius: "0.5rem",
    }),
    multiValue: (styles: object) => ({
        ...styles,
        backgroundColor: "#BBF7D0",
        borderRadius: "0.5rem",
    }),
    multiValueLabel: (styles: object) => ({
        ...styles,
        color: "#000000",
    }),
    multiValueRemove: (styles: object) => ({
        ...styles,
        color: "#000000",
        ":hover": {
            color: "#000000",
            cursor: "pointer",
        },
    }),
    valueContainer: (provided: object) => ({
        ...provided,
        maxHeight: "40px",
        overflow: "auto",
    }),
};

const createCarFormKeys = {
    CAR_EXTRAS: "car-extras",
    CAR_TYPE: "car-type",
    CAR_MAKE: "car-make",
    CAR_TRANSMISSION: "car-transmission",
    CAR_CONDITION: "car-condition",
    CAR_FUEL_TYPE: "car-fuel-type",
    CAR_ENGINE_TYPE: "car-engine-type",
    CAR_DRIVE_TYPE: "car-drive-type",
    CAR_MODEL: "car-model",
    CAR_KM: "car-km",
    CAR_YEAR: "car-year",
    CAR_COLOR: "car-color",
    CAR_ENGINE_SIZE: "car-engine-size",
    CAR_DOORS: "car-doors",
    CAR_HORSEPOWER: "car-horsepower",
    CAR_TECHNICAL_DESCRIPTION: "car-technical-description",
    CAR_RATING: "car-rating",
    CAR_PRICE: "car-price",
    CAR_IMAGES: "car-images",
};

const createCarFormDefaultValues = {
    [createCarFormKeys.CAR_EXTRAS]: [], // since it's a multi-select, default to an empty array
    [createCarFormKeys.CAR_IMAGES]: [],
    [createCarFormKeys.CAR_TYPE]: null, // or your default option
    [createCarFormKeys.CAR_MAKE]: null, // or your default option
    [createCarFormKeys.CAR_TRANSMISSION]: null, // or your default option
    [createCarFormKeys.CAR_CONDITION]: null, // or your default option
    [createCarFormKeys.CAR_FUEL_TYPE]: null, // or your default option
    [createCarFormKeys.CAR_ENGINE_TYPE]: null, // or your default option
    [createCarFormKeys.CAR_DRIVE_TYPE]: null, // or your default option
    [createCarFormKeys.CAR_MODEL]: "", // default to an empty string
    [createCarFormKeys.CAR_KM]: "", // default to an empty string
    [createCarFormKeys.CAR_YEAR]: "", // default to an empty string
    [createCarFormKeys.CAR_COLOR]: "", // default to an empty string
    [createCarFormKeys.CAR_ENGINE_SIZE]: "", // default to an empty string
    [createCarFormKeys.CAR_DOORS]: "", // default to an empty string
    [createCarFormKeys.CAR_HORSEPOWER]: "", // default to an empty string
    [createCarFormKeys.CAR_TECHNICAL_DESCRIPTION]: "", // default to an empty string
    [createCarFormKeys.CAR_RATING]: 0, // assuming the rating starts at 0
    [createCarFormKeys.CAR_PRICE]: 25000, // default price
    // Add more fields as necessary
};

export default function Page() {
    const animatedComponents = makeAnimated();
    const [hoverRating, setHoverRating] = useState(0);
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
        console.log(JSON.stringify(res));
        alert("Upload Completed");
    };

    const onSubmit = async (data: object) => {
        await carService.create({ ...data, userId, userEmail });
        console.log("done");
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
            className="max-w-[1000px] container text-black p-20 flex flex-col gap-y-2 overflow-auto mx-auto"
        >
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
                            options={luxuryCarExtras}
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
                            value={luxuryCarExtras.filter((option) =>
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
                            isMulti={false}
                            components={animatedComponents}
                            options={transmissionTypes as any}
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
                            {...field} // This spreads the onChange, onBlur, value, and name properties
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
