//requester
import * as requester from "./requester";

//shared
import {
    getAuthHeaders,
    orderObjectCollectionAsc,
    orderObjectCollectionDesc,
} from "@/app/utilities/shared/shared";

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

export const getAllOffersForSeller = async (
    userId: string,
    filter: string,
    sort: string
) => {
    const headers = getAuthHeaders(false);
    const sellerQuery = encodeURIComponent(`sellerId = "${userId}"${filter}`);

    let offers = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${sellerQuery}`
    );

    offers = sortIfNeeded(offers, sort);

    return offers;
};

export const getAllOffersForBuyer = async (
    userId: string,
    filter: string,
    sort: string
) => {
    const headers = getAuthHeaders(false);
    const buyerQuery = encodeURIComponent(`buyerId = "${userId}"${filter}`);

    let offers = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${buyerQuery}`
    );

    offers = sortIfNeeded(offers, sort);

    return offers;
};

export const getUnreadOfferCount = async (sellerId: string) => {
    const headers = getAuthHeaders(false);

    const query = encodeURIComponent(
        `sellerId = "${sellerId}" AND isRead = ${false}`
    );

    const offers = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${query}`
    );

    return offers.length;
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

export const filterBy = async (filter: string) => {
    const headers = getAuthHeaders(false);
    const query = encodeURIComponent(filter);

    const offers = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${query}`
    );

    return offers;
};

//Helper Functions

const sortIfNeeded = (collection: any, sort: string) => {
    //Created due to limitations of the server - cannot do both search and sort!
    if (sort !== "") {
        if (sort.includes("desc")) {
            return orderObjectCollectionDesc(collection, sort.split(" ")[0]);
        } else {
            return orderObjectCollectionAsc(collection, sort);
        }
    }

    return collection;
};
