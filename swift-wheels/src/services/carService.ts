//requester
import * as requester from "./requester";

//types
import { headerType } from "@/app/utilities/types/authService.types";

const baseUrl = "http://localhost:3030/data/cars";

const getAuthHeaders = () => {
    let headers: headerType = {
        "Content-Type": "application/json",
    };

    const authenticationEntity = localStorage.getItem("auth");

    if (authenticationEntity) {
        const token = JSON.parse(authenticationEntity).accessToken;
        headers = { ...headers, "X-Authorization": token };
    }

    return headers;
};

export const getOne = async (carId: string) => {
    const response = await requester.get(`${baseUrl}/${carId}`);
    return response;
};

export const getAll = async () => {
    const response = await requester.get(baseUrl);
    const cars = Object.values(response);
    return cars;
};

export const getAllFilter = async (filters: any) => {
    const headers = getAuthHeaders();

    const queryParameters = filters.map((filter: any) => {
        const filterKey = filter.key.includes("price")
            ? "car-price"
            : filter.key.includes("km")
            ? "car-km"
            : filter.key.includes("horsepower")
            ? "car-horsepower"
            : filter.key;

        return typeof filter.value === "string" && !/\d/.test(filter.value)
            ? `${filterKey} ${filter.separator} "${filter.value}"`
            : `${filterKey}${filter.separator}${Number(filter.value)}`;
    });

    const query = encodeURIComponent(queryParameters.join(" AND "));
    const filteredCars = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${query}`
    );

    return filteredCars;
};

export const create = async (data: object) => {
    const headers = getAuthHeaders();
    const response = await requester.authorizationPost(
        headers,
        JSON.stringify(data),
        baseUrl
    );
    return response;
};
