//types
import * as searchContextTypes from "../types/searchContext.types";
import { Range } from "react-date-range";

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

//cars
const car_makes = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Lexus",
    "Porsche",
    "Land Rover",
    "Cadillac",
    "Volvo",
    "Jeep",
    "Tesla",
];
const car_models = [
    "X5 M",
    "GLS 580",
    "Q7",
    "RX 350",
    "Cayenne",
    "Range Rover",
    "Escalade",
    "XC90",
    "Wrangler",
    "Model X",
];
const car_prices = [
    "$120,000",
    "$95,000",
    "$85,000",
    "$76,000",
    "$110,000",
    "$130,000",
    "$98,000",
    "$90,000",
    "$70,000",
    "$105,000",
];
const car_years = [
    "2019",
    "2018",
    "2021",
    "2020",
    "2017",
    "2016",
    "2022",
    "2023",
    "2015",
    "2024",
];
const car_colors = [
    "Black Sapphire",
    "Polar White",
    "Mythos Black",
    "Atomic Silver",
    "Jet Black Metallic",
    "Santorini Black",
    "Crystal White",
    "Thunder Grey",
    "Firecracker Red",
    "Midnight Silver Metallic",
];
const car_fuel_types = [
    "Hybrid",
    "Petrol",
    "Electric",
    "Diesel",
    "Petrol",
    "Diesel",
    "Petrol",
    "Hybrid",
    "Petrol",
    "Electric",
];
const car_engine_sizes = [
    "3L",
    "4L",
    "2L",
    "3.5L",
    "3L",
    "4.4L",
    "6.2L",
    "2L",
    "3.6L",
    "Electric",
];
const car_horsepowers = [
    "567HP",
    "483HP",
    "335HP",
    "295HP",
    "541HP",
    "518HP",
    "420HP",
    "316HP",
    "285HP",
    "762HP",
];
const car_drive_types = [
    "AWD",
    "4MATIC",
    "quattro",
    "FWD",
    "AWD",
    "4WD",
    "4WD",
    "AWD",
    "4WD",
    "AWD",
];
const car_transmissions = [
    "Automatic",
    "Automatic",
    "Automatic",
    "Automatic",
    "Automatic",
    "Automatic",
    "Automatic",
    "Automatic",
    "Manual",
    "Automatic",
];
const car_conditions = [
    "Used",
    "New",
    "Used",
    "New",
    "Used",
    "Used",
    "New",
    "Used",
    "New",
    "Used",
];
const cars = [];

for (let i = 0; i < 10; i++) {
    // changed 'const' to 'let' and 'range(10)' to 'i < 10'
    const km = car_conditions[i] === "Used" ? "50 000km" : "0km";
    const cylinders = ["2L", "3L", "3.5L"].includes(car_engine_sizes[i])
        ? "6"
        : "8";
    const new_car = {
        type: "SUV",
        make: car_makes[i],
        name: `${car_makes[i]} ${car_models[i]}`,
        model: car_models[i],
        price: car_prices[i],
        stars: Math.random() * (5 - 1) + 1,
        image: `/images/carSlider/${car_makes[i].toLowerCase()}1.png`,
        km: km,
        transmission: car_transmissions[i],
        condition: car_conditions[i],
        year: car_years[i],
        color: car_colors[i],
        "fuel type": car_fuel_types[i],
        "engine size": car_engine_sizes[i],
        doors: "4",
        cylinders: cylinders,
        horsepower: car_horsepowers[i],
        "drive type": car_drive_types[i],
        extras: [
            "Advanced Navigation System",
            "Premium Leather Upholstery",
            "Heated and Ventilated Front Seats",
            "Rear-Seat Entertainment System",
            "Adaptive Cruise Control",
            "Blind Spot Monitoring",
            "360-degree Camera System",
            "Enhanced Off-Road Capabilities Package",
            "Premium Sound System",
            "Panoramic Sunroof",
            "Wireless Charging Pad",
            "Power Tailgate with Gesture Control",
            "Multi-Terrain Select with Crawl Control",
            "LED Headlights with Automatic High Beams",
            "Head-Up Display",
        ],
        technicalDescription:
            `The ${car_makes[i]} ${car_models[i]} is a luxury SUV designed to offer a balance between comfort, style, and performance. ` +
            `It features a ${car_engine_sizes[i]} ${car_fuel_types[i]} engine, which delivers a robust ${car_horsepowers[i]} horsepower. ` +
            `This model comes with a ${car_transmissions[i]} transmission and ${car_drive_types[i]} system, making it suitable for both on-road and off-road conditions. ` +
            `The interior boasts premium materials and advanced technology, ensuring a luxurious driving experience.`,
        images: [
            `/images/carSlider/${car_makes[i].toLowerCase()}1.jpg`,
            `/images/carSlider/${car_makes[i].toLowerCase()}2.jpg`,
            `/images/carSlider/${car_makes[i].toLowerCase()}3.jpg`,
            `/images/carSlider/${car_makes[i].toLowerCase()}4.jpg`,
        ],
    };
    cars.push(new_car);
}

export { cars };
