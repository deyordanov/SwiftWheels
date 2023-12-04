//requester
import * as requester from "./requester";

//shared
import { getAuthHeaders } from "@/app/utilities/shared/shared";

const baseUrl = "http://localhost:3030/data/cars";

export const getOne = async (carId: string) => {
    const response = await requester.get(`${baseUrl}/${carId}`);
    return response;
};

export const getAll = async () => {
    const response = await requester.get(baseUrl);

    try {
        const cars = Object.values(response);

        return cars;
    } catch {
        return [];
    }
};

export const getAllFilter = async (
    filters: any,
    page: number,
    pageSize: number
) => {
    const headers = getAuthHeaders(false);

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
        console.log(queryParameters);

        url += `?where=${query}`;
    }

    let filteredCars = await requester.authorizationGet(headers, {}, url);

    const carsCount = filteredCars.length;

    //Yet again due to limitations of the server - in-memory filtering has to be done
    filteredCars = filteredCars.slice(
        (page - 1) * pageSize,
        page * pageSize > filteredCars.length
            ? filteredCars.length
            : page * pageSize
    );

    return { cars: filteredCars, carsCount };
};

export const create = async (data: any) => {
    const headers = getAuthHeaders(false);
    const response = await requester.authorizationPost(
        headers,
        JSON.stringify({
            ...data,
            "car-horsepower": Number(data["car-horsepower"]),
            "car-km": Number(data["car-km"]),
        }),
        baseUrl
    );
    return response;
};

export const addUserToFavorites = async (carId: string, userId: string) => {
    const car = await getOne(carId);
    //In order to pass the restriction that only the creator can update the entity, full access is granted!
    const headers = getAuthHeaders(true);

    await requester.authorizationPut(
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
    const car = await getOne(carId);
    //In order to pass the restriction that only the creator can update the entity, full access is granted!
    const headers = getAuthHeaders(true);

    await requester.authorizationPut(
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

export const getCarCount = async () => {
    const headers = getAuthHeaders(false);

    const carCount = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?count`
    );

    return carCount;
};
