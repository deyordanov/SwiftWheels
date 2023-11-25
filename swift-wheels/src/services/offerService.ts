//requester
import * as requester from "./requester";

//shared
import { getAuthHeaders } from "@/app/utilities/shared/shared";

const baseUrl = "http://localhost:3030/data/offers";

export const create = async (data: object) => {
    const headers = getAuthHeaders(false);
    const response = await requester.authorizationPost(
        headers,
        JSON.stringify({ ...data }),
        baseUrl
    );
    return response;
};

export const getAllFilter = async (sellerId: string) => {
    console.log(sellerId);
    console.log(sellerId);
    const headers = getAuthHeaders(false);
    const query = encodeURIComponent(
        `sellerId = "${sellerId}" OR _ownerId = "${sellerId}"`
    );

    const offers = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${query}`
    );

    return offers;
};
