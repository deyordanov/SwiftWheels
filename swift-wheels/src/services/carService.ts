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

    let url = baseUrl;

    if (filters.length > 0) {
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

        url += `?where=${query}`;
    }
    const filteredCars = await requester.authorizationGet(headers, {}, url);

    console.log(filteredCars);

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

export const addUserToFavorites = async (carId: string, userId: string) => {
    const headers = getAuthHeaders();
    const car = await getOne(carId);
    await requester.authorizationPatch(
        headers,
        JSON.stringify({
            ...car,
            "car-favorites": [...car["car-favorites"], userId],
        }),
        `${baseUrl}/${carId}`
    );
};

export const removeUserFromFavorites = async (
    carId: string,
    userId: string
) => {
    const headers = getAuthHeaders();
    const car = await getOne(carId);
    await requester.authorizationPatch(
        headers,
        JSON.stringify({
            ...car,
            "car-favorites": car["car-favorites"].filter(
                (id: string) => id !== userId
            ),
        }),
        `${baseUrl}/${carId}`
    );
};
