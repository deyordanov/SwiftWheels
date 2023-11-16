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
    console.log(response);
    return response;
};

export const getAll = async () => {
    const response = await requester.get(baseUrl);
    const cars = Object.values(response);
    return cars;
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
