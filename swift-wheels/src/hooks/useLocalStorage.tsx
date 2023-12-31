import { useState, useEffect } from "react";

function getSavedValue(key: string, initialValue: any) {
    // Check if the code is running in a browser environment
    if (typeof window === "undefined") {
        return initialValue;
    }

    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        try {
            return JSON.parse(savedValue);
        } catch (e) {
            console.error("Parsing error on", key, e);
            localStorage.removeItem(key);
        }
    }

    if (initialValue instanceof Function) {
        return initialValue();
    }

    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        if (typeof window !== "undefined" && value !== undefined) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
}
