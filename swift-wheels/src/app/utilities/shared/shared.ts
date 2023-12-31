//types
import { CSSObjectWithLabel } from "react-select";
import * as headerTypes from "@/app/utilities/types/authService.types";

//constants
import { carDetailsGeocodingApi } from "../constants/constans";

export function getSelectControlType(
    errors: any,
    fieldName: string,
    base: CSSObjectWithLabel
) {
    return {
        ...base,
        borderColor: errors[fieldName] ? "rgb(244, 67, 54)" : base.borderColor,
        boxShadow: "none",
        "&:hover": {
            borderColor: errors[fieldName]
                ? "rgb(244, 67, 54)"
                : base.borderColor,
        },
    };
}

export function capitalizeWords(str: string) {
    return str
        .split("-")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .filter((word) => word !== "Car")
        .join(" ");
}

export function formatPrice(price: number) {
    return `${price.toLocaleString("en-US")}$`;
}

export function convertTimestampToCustomFormat(timestamp: number) {
    const date = new Date(timestamp);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    const timeMatch = date.toUTCString().match(/(\d{2}:\d{2}):\d{2}/);
    const time = timeMatch ? timeMatch[1] : null;

    return `${day} of ${month} - ${time}`;
}

export function convertTimestampToEuropeanFormat(timestamp: number): string {
    const date = new Date(timestamp);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

export const geocodeAddress = async (
    addressToGeocode: string,
    setCenter: any
) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const url = `${carDetailsGeocodingApi}?address=${encodeURIComponent(
        addressToGeocode
    )}&key=${encodeURIComponent(apiKey)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.results?.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setCenter({ lat, lng });
        } else {
            console.error("No results for the address: ", addressToGeocode);
        }
    } catch (error) {
        console.error("Geocoding error: ", error);
    }
};

export function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export const getAuthHeaders = (grantFullAccess: boolean) => {
    let headers: headerTypes.headerType = {
        "Content-Type": "application/json",
    };

    const authenticationEntity = localStorage.getItem("auth");

    if (authenticationEntity) {
        const token = JSON.parse(authenticationEntity).accessToken;
        headers = !grantFullAccess
            ? { ...headers, "X-Authorization": token }
            : { ...headers, "X-Authorization": token, "X-Admin": token };
    }

    return headers;
};

export function extractPlaceholder(inputString: string) {
    return inputString
        .toLowerCase()
        .split("_")
        .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
        )
        .join(" ");
}

export const orderObjectCollectionAsc = (collection: any, parameter: string) =>
    collection.sort((a: any, b: any) => a[parameter] - b[parameter]);

export const orderObjectCollectionDesc = (collection: any, parameter: string) =>
    collection.sort((a: any, b: any) => b[parameter] - a[parameter]);
