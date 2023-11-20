//types
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { HeadersInit } from "@/app/utilities/types/requester.types";

export const request = async (
    method: string,
    headers: HeadersInit,
    body: any,
    url: string
) => {
    let options: RequestInit = {
        method,
        headers,
    };

    if (method !== "GET" && method !== "HEAD" && body) {
        options = { ...options, body };
    }

    const response = await fetch(url, options);

    if (!response.ok || response.status === 204) {
        console.log("Requester error handling:");
        throw response;
    }

    return response.json();
};

export const get = request.bind(null, "GET", {}, {});

export const post = request.bind(null, "POST", {
    "Content-Type": "application/json",
});

export const put = request.bind(null, "PUT");

export const authorizationDelete = request.bind(null, "DELETE");

export const authorizationPost = request.bind(null, "POST");

export const authorizationGet = request.bind(null, "GET");

export const authorizationPut = request.bind(null, "PUT");

//....
