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

export const remove = async (offerId: string) => {
    const headers = getAuthHeaders(true);

    await requester.authorizationDelete(headers, {}, `${baseUrl}/${offerId}`);
};

export const changeStatus = async (offer: any, newStatus: string) => {
    const headers = getAuthHeaders(true);

    const newOffer = await requester.authorizationPut(
        headers,
        JSON.stringify({ ...offer, offerStatus: newStatus }),
        `${baseUrl}/${offer._id}`
    );

    return newOffer;
};

export const changeIsRead = async (offer: any) => {
    const headers = getAuthHeaders(true);

    const newOffer = await requester.authorizationPut(
        headers,
        JSON.stringify({ ...offer, isRead: true }),
        `${baseUrl}/${offer._id}`
    );

    return newOffer;
};
