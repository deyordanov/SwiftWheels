"use client";

//hooks
import React, { useState } from "react";

//uploadthing
import { UploadDropzone } from "../utilities/uploadthing";

//react-select
import makeAnimated from "react-select/animated";
import Select from "react-select";

//components
import { Star } from "./Star/Star";

//react-slider
import ReactSlider from "react-slider";

//types
import { MultiValue, SingleValue } from "react-select";
import { button } from "@material-tailwind/react";
import { UploadFileResponse } from "uploadthing/client";

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
    "Dual-Clutch Transmission (DCT)",
    "Tiptronic",
    "Direct Shift Gearbox (DSG)",
    "Automated Manual Transmission (AMT)",
    "Sequential Manual Gearbox (SMG)",
    "Torque Converter Automatic",
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
    "Plug-in Hybrid",
    "Flex-Fuel",
    "Hydrogen Fuel Cell",
    "Compressed Natural Gas (CNG)",
    "Liquefied Petroleum Gas (LPG)",
    "Ethanol",
    "Biodiesel",
    "Methanol",
    "P-Series Fuels",
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
    "All Wheel Drive (AWD)",
    "Four Wheel Drive (4WD)",
    "Front Wheel Drive (FWD)",
    "Rear Wheel Drive (RWD)",
    "Four Wheel Drive (4x4)",
    "Two Wheel Drive (2WD)",
    "Part-Time Four Wheel Drive",
    "Full-Time Four Wheel Drive",
    "Six Wheel Drive (6WD)",
    "Eight Wheel Drive (8WD)",
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

export default function Page() {
    const animatedComponents = makeAnimated();
    const [selectedExtras, setSelectedExtras] = useState<Array<string>>([]);
    const [selectedType, setSelectedType] = useState<SingleValue<IOption>>();
    const [selectedMake, setSelectedMake] = useState<SingleValue<IOption>>();
    const [selectedTransmission, setSelectedTransmission] =
        useState<SingleValue<IOption>>();
    const [selectedCarCondition, setSelectedCarCondition] =
        useState<SingleValue<IOption>>();
    const [selectedFuelType, setSelectedFuelType] =
        useState<SingleValue<IOption>>();
    const [selectedEngineType, setSelectedEngineType] =
        useState<SingleValue<IOption>>();
    const [selectedDriveType, setSelectedDriveType] =
        useState<SingleValue<IOption>>();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [price, setPrice] = useState<number>(25000);
    const [images, setImages] = useState<UploadFileResponse[] | undefined>([]);

    const onMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onSaveRating = (index: number) => {
        setRating(index);
    };

    const handleCarExtras = (selectedOptions: MultiValue<IOption>) => {
        setSelectedExtras(selectedOptions.map((option) => option.value));
    };

    const handleCarType = (selectedOption: SingleValue<IOption>) => {
        setSelectedType(selectedOption);
    };

    const handleCarMake = (selectedOption: SingleValue<IOption>) => {
        setSelectedMake(selectedOption);
    };

    const handleTransmissionType = (selectedOption: SingleValue<IOption>) => {
        setSelectedTransmission(selectedOption);
    };

    const handleCarCondition = (selectedOption: SingleValue<IOption>) => {
        setSelectedCarCondition(selectedOption);
    };

    const handleFuelType = (selectedOption: SingleValue<IOption>) => {
        setSelectedFuelType(selectedOption);
    };

    const handleEngineType = (selectedOption: SingleValue<IOption>) => {
        setSelectedEngineType(selectedOption);
    };

    const handleDriveType = (selectedOption: SingleValue<IOption>) => {
        setSelectedDriveType(selectedOption);
    };

    return (
        <section className="container text-black p-20 flex flex-col gap-y-2 overflow-auto">
            <div className="w-full flex gap-x-4">
                <Select
                    components={animatedComponents}
                    isMulti
                    name="luxuryCarExtras"
                    options={luxuryCarExtras}
                    className="basic-multi-select min-w-[75%]"
                    classNamePrefix="select"
                    styles={customStyles}
                    value={luxuryCarExtras.filter((obj) =>
                        selectedExtras.includes(obj.value)
                    )}
                    onChange={(options) => handleCarExtras(options)}
                    isOptionDisabled={(option) =>
                        selectedExtras.includes(option.value)
                    }
                    placeholder="Car extras....."
                />
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carType"
                    options={carTypes}
                    className="w-full"
                    styles={customStyles}
                    value={selectedType}
                    onChange={(option) => handleCarType(option)}
                    isOptionDisabled={(option) => option === selectedType}
                    placeholder="Car type....."
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carType"
                    options={carMakes}
                    className="w-[25%]"
                    styles={customStyles}
                    value={selectedMake}
                    onChange={(option) => handleCarMake(option)}
                    isOptionDisabled={(option) => option === selectedMake}
                    placeholder="Car make....."
                />
                <input
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Model....."
                    className="placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="number"
                    name="km"
                    id="km"
                    placeholder="Kilometers....."
                    className="placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carTransmission"
                    options={transmissionTypes}
                    className="grow"
                    styles={customStyles}
                    value={selectedTransmission}
                    onChange={(option) => handleTransmissionType(option)}
                    isOptionDisabled={(option) =>
                        option === selectedTransmission
                    }
                    placeholder="Car transmission....."
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carCondition"
                    options={carConditions}
                    className="w-[25%]"
                    styles={customStyles}
                    value={selectedCarCondition}
                    onChange={(option) => handleCarCondition(option)}
                    isOptionDisabled={(option) =>
                        option === selectedCarCondition
                    }
                    placeholder="Car condition....."
                />
                {/* Add max/min */}
                <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Year....."
                    className="placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="text"
                    name="color"
                    id="color"
                    placeholder="Color....."
                    className="placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carFuelType"
                    options={carFuelTypes}
                    className="w-[25%]"
                    styles={customStyles}
                    value={selectedFuelType}
                    onChange={(option) => handleFuelType(option)}
                    isOptionDisabled={(option) => option === selectedFuelType}
                    placeholder="Car fuel type....."
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carEngineType"
                    options={carEngineTypes}
                    className="w-[30%]"
                    styles={customStyles}
                    value={selectedEngineType}
                    onChange={(option) => handleEngineType(option)}
                    isOptionDisabled={(option) => option === selectedEngineType}
                    placeholder="Car engine type....."
                />
                <input
                    type="text"
                    name="size"
                    id="size"
                    placeholder="Engine size....."
                    className="placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {/* Add min/max */}
                <input
                    type="number"
                    name="doors"
                    id="doors"
                    placeholder="Doors....."
                    className="placeholder-gray-600 w-[20%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {/* Add min */}
                <input
                    type="number"
                    name="horsepower"
                    id="horsepower"
                    placeholder="Horsepower....."
                    className="placeholder-gray-600 w-[25%] border border-gray-400 rounded-md text-black py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="w-full flex gap-x-4 items-center">
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carDriveType"
                    options={carDriveTypes}
                    className="w-[40%]"
                    styles={customStyles}
                    value={selectedDriveType}
                    onChange={(option) => handleDriveType(option)}
                    isOptionDisabled={(option) => option === selectedDriveType}
                    placeholder="Car drive type....."
                />
                <div className="w-full flex items-center gap-x-8 bg-gray-50 p-2 rounded-lg">
                    <ReactSlider
                        className="h-2 w-full flex items-center"
                        thumbClassName="h-6 w-6 rounded-full bg-blue-500 hover:bg-blue-700 focus:outline-none"
                        trackClassName="h-2 bg-gray-200"
                        defaultValue={price}
                        onChange={(value) => setPrice(Number(value))}
                        min={0}
                        max={1000000}
                        step={100}
                    />
                    <div className="w-[32%] text-gray-800">
                        Price: ${price.toLocaleString()}
                    </div>
                </div>
            </div>
            <textarea
                className="placeholder-gray-600 focus:outline-none border-gray-400 rounded-lg border min-h-[100px] max-h-[400px] p-2 "
                name="technicalDescription"
                id="technicalDescription"
                placeholder="Technical description....."
            ></textarea>
            <div className="flex gap-x-2">
                <p>How would you rate your car overall?</p>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <Star
                            key={index}
                            filled={
                                hoverRating >= index ||
                                (!hoverRating && rating >= index)
                            }
                            onMouseEnter={() => onMouseEnter(index)}
                            onMouseLeave={onMouseLeave}
                            onClick={() => onSaveRating(index)}
                        />
                    ))}
                </div>
            </div>
            <UploadDropzone
                content={{
                    button() {
                        return "Upload Images";
                    },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    setImages(res);
                    console.log(JSON.stringify(res));
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </section>
    );
}
