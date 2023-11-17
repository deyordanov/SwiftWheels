//types
import * as searchContextTypes from "../types/searchContext.types";
import { Range } from "react-date-range";
import * as createCarTypes from "../types/createCar.types";

//      Search Context
export const searchContextDefaultValues: searchContextTypes.defaultTypes = {
    searchActive: false,
    setSearchActive: () => {}, //empty func
};

//      Date Selection
export const setDateDefaultValues: Range = {
    startDate: new Date(),
    endDate: undefined,
    key: "selection",
};

//      Location Selection
export const locations = [
    "1000 Kingsway, Canada",
    "2200 Autobahn Ave, Germany",
    "58 Rue de l'Automobile, France",
    "15 Car Dealership Road, Australia",
    "88 Vehicular Street, Japan",
];

//      Hours Selection
export const hours = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
];

//      Login

//-> Form Keys
export const LoginFormKeys = {
    EMAIL: "email",
    PASSWORD: "password",
};

//-> Form Default Values
export const LoginFormDefaultValues = {
    [LoginFormKeys.EMAIL]: "",
    [LoginFormKeys.PASSWORD]: "",
};

//      Register

//->Form Keys
export const RegisterFormKeys = {
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirm-password",
    CONDITIONS: "conditions",
};

//->Form Default Values
export const RegisterFormDefaultValues = {
    [RegisterFormKeys.EMAIL]: "",
    [RegisterFormKeys.PASSWORD]: "",
    [RegisterFormKeys.CONFIRM_PASSWORD]: "",
    [RegisterFormKeys.CONDITIONS]: false,
};

//      Contact

//-> Form Keys
export const ContactFormKeys = {
    NAME: "name",
    EMAIL: "email",
    MESSAGE: "message",
};

//-> Form Default Values
export const ContactFormDefaultValues = {
    [ContactFormKeys.NAME]: "",
    [ContactFormKeys.EMAIL]: "",
    [ContactFormKeys.MESSAGE]: "",
};

//      MakeOffer

//-> Form Keys
export const MakeOfferFormKeys = {
    OFFER: "offer",
};

//-> Form Default Values
export const MakeOfferFormDefaultValues = {
    [MakeOfferFormKeys.OFFER]: null,
};

//  FinanceCalculator

//-> Form Keys
export const FinanceCalculatorKeys = {
    "DOWN-PAYMENT": "down-payment",
    "LOAN-TERM": "loan-term",
    OFFER: "offer",
    "INTEREST-RATE": "interest-rate",
};

//->Form Default Values
export const FinanceCalculatorDefaultValues = {
    [FinanceCalculatorKeys["DOWN-PAYMENT"]]: "",
    [FinanceCalculatorKeys["LOAN-TERM"]]: "",
};

//      GoogleMap
export const googleMapContainerStyle = {
    width: "100%",
    height: "500px",
};

export const googleMapDefaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    clickableIcons: false,
    streetViewControl: false,
};

//      Car Details

export const carDetailsGeocodingApi = `https://maps.googleapis.com/maps/api/geocode/json`;

//      Create Car

export const carExtras: createCarTypes.IOption[] = [
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

export const carTypes: createCarTypes.IOption[] = [
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

export const carMakes: createCarTypes.IOption[] = [
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

export const carTransmissionTypes: createCarTypes.IOption[] = [
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

export const carConditions: createCarTypes.IOption[] = [
    "New",
    "Used",
    "Crashed",
    "In need of repair",
].map((condition) => ({ value: condition, label: condition }));

export const carFuelTypes: createCarTypes.IOption[] = [
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

export const carEngineTypes: createCarTypes.IOption[] = [
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

export const carDriveTypes: createCarTypes.IOption[] = [
    "AWD",
    "4WD",
    "FWD",
    "RWD",
    "4x4",
    "6WD",
    "8WD",
].map((driveType) => ({ value: driveType, label: driveType }));

export const customStyles = {
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

export const createCarFormKeys = {
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

export const createCarFormDefaultValues = {
    [createCarFormKeys.CAR_EXTRAS]: [],
    [createCarFormKeys.CAR_IMAGES]: [],
    [createCarFormKeys.CAR_TYPE]: null,
    [createCarFormKeys.CAR_MAKE]: null,
    [createCarFormKeys.CAR_TRANSMISSION]: null,
    [createCarFormKeys.CAR_CONDITION]: null,
    [createCarFormKeys.CAR_FUEL_TYPE]: null,
    [createCarFormKeys.CAR_ENGINE_TYPE]: null,
    [createCarFormKeys.CAR_DRIVE_TYPE]: null,
    [createCarFormKeys.CAR_MODEL]: "",
    [createCarFormKeys.CAR_KM]: "",
    [createCarFormKeys.CAR_YEAR]: "",
    [createCarFormKeys.CAR_COLOR]: "",
    [createCarFormKeys.CAR_ENGINE_SIZE]: "",
    [createCarFormKeys.CAR_DOORS]: "",
    [createCarFormKeys.CAR_HORSEPOWER]: "",
    [createCarFormKeys.CAR_TECHNICAL_DESCRIPTION]: "",
    [createCarFormKeys.CAR_RATING]: 0,
    [createCarFormKeys.CAR_PRICE]: 25000,
};

//      Filter
export const filterFormKeys = {
    LOWER_BOUND: "lower-bound",
    UPPER_BOUND: "upper-bound",
};

export const filterFormDefaultValues = {
    [filterFormKeys.LOWER_BOUND]: 0,
    [filterFormKeys.UPPER_BOUND]: 10000,
};
