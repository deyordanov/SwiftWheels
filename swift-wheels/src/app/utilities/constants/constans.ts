//types
import * as searchContextTypes from "../types/searchContext.types";
import { Range } from "react-date-range";

//Search Context
export const searchContextDefaultValues: searchContextTypes.defaultTypes = {
    searchActive: false,
    setSearchActive: () => {}, //empty func
};

//Date Selection
export const setDateDefaultValues: Range = {
    startDate: new Date(),
    endDate: undefined,
    key: "selection",
};

//Location Selection
export const locations = [
    "1000 Kingsway, Canada",
    "2200 Autobahn Ave, Germany",
    "58 Rue de l'Automobile, France",
    "15 Car Dealership Road, Australia",
    "88 Vehicular Street, Japan",
];

//Hours Selection
export const hours = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
];

//Login

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

//Register

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

//GoogleMap
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

//Car Details

export const carDetailsGeocodingApi = `https://maps.googleapis.com/maps/api/geocode/json`;
