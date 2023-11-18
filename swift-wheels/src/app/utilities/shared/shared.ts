//types
import { CSSObjectWithLabel } from "react-select";

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
    const time = date.toUTCString().match(/(\d{2}:\d{2}):\d{2}/)[1];
    return `${day}th of ${month} - ${time}`;
}
