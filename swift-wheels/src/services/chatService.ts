//requester
import * as requester from "./requester";

//shared
import { getAuthHeaders } from "@/app/utilities/shared/shared";

const baseUrl = "http://localhost:3030/data/chats";

export const create = async (data: object) => {
    const headers = getAuthHeaders(false);
    const response = await requester.authorizationPost(
        headers,
        JSON.stringify({ ...data }),
        baseUrl
    );
    return response;
};

export const getAllFilter = async (sellerId: string, carId: string) => {
    const headers = getAuthHeaders(false);
    //`${filterKey} ${filter.separator} "${filter.value}"`
    const query = encodeURIComponent(
        `sellerId = "${sellerId}" AND carId = "${carId}"`
    );
    const offers = await requester.authorizationGet(
        headers,
        {},
        `${baseUrl}?where=${query}`
    );

    return offers;
};

export const getOne = async (chatId: string) => {
    const response = await requester.get(`${baseUrl}/${chatId}`);
    return response;
};

export const addMessageToChat = async (
    chatId: string,
    message: string,
    userId: string
) => {
    const chat = await getOne(chatId);
    //In order to pass the restriction that only the creator can update the entity, full access is granted!
    const headers = getAuthHeaders(true);

    const newChat = await requester.authorizationPut(
        headers,
        JSON.stringify({
            ...chat,
            messages: [...chat.messages, { message, senderId: userId }],
        }),
        `${baseUrl}/${chatId}`
    );

    return newChat;
};
