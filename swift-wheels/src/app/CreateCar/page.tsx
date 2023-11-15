"use client";

//hooks
import React, { useState } from "react";

//uploadthing
import { UploadDropzone } from "../utilities/uploadthing";

//react-select
import makeAnimated from "react-select/animated";
import Select from "react-select";

//types
import { MultiValue, SingleValue } from "react-select";

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
        maxHeight: "30px",
        overflow: "auto",
    }),
};

export default function Page() {
    const [selectedExtras, setSelectedExtras] = useState<Array<string>>([]);
    const [selectedType, setSelectedType] = useState<SingleValue<IOption>>();
    const [selectedMake, setSelectedMake] = useState<SingleValue<IOption>>();

    const animatedComponents = makeAnimated();

    const handleCarExtras = (selectedOptions: MultiValue<IOption>) => {
        setSelectedExtras(selectedOptions.map((option) => option.value));
    };

    const handleCarType = (selectedOption: SingleValue<IOption>) => {
        setSelectedType(selectedOption);
    };

    const handleCarMake = (selectedOption: SingleValue<IOption>) => {
        setSelectedMake(selectedOption);
    };

    return (
        <section className="container text-black p-20 flex flex-col">
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
                    className="min-w-[20%]"
                    styles={customStyles}
                    value={selectedType}
                    onChange={(option) => handleCarType(option)}
                    isOptionDisabled={(option) => option === selectedType}
                    placeholder="Car type....."
                />
            </div>
            <div className="w-full flex gap-x-4">
                <Select
                    isMulti={false}
                    components={animatedComponents}
                    name="carType"
                    options={carMakes}
                    className="min-w-[20%]"
                    styles={customStyles}
                    value={selectedMake}
                    onChange={(option) => handleCarMake(option)}
                    isOptionDisabled={(option) => option === selectedMake}
                    placeholder="Car make....."
                />
            </div>
            <div className="flex h-screen flex-col items-center p-24">
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log(JSON.stringify(res));
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>
        </section>
    );
}
