"use client";

//services
import * as offerService from "@/services/offerService";

//types
import React, { useEffect, useState } from "react";

import DataPopover from "./Popover/Popover";
import { useAuthContext } from "../Contexts/authContext";
import {
    formatPrice,
    convertTimestampToCustomFormat,
} from "../utilities/shared/shared";
import "flowbite";

export default function Page() {
    const [offers, setOffers] = useState([]);
    const { userId } = useAuthContext();

    useEffect(() => {
        const handleOffers = async () => {
            setOffers(await offerService.getAllFilter(userId));
        };

        handleOffers();
    }, [userId]);

    return (
        <section className="container flex items-center justify-center h-screen w-screen mx-auto mt-2 text-primary font-semibold">
            <ul className="flex flex-col h-full">
                {offers?.map((offer: any) => (
                    <li
                        key={offer._id}
                        className="flex items-center px-4 py-2 rounded-lg shadow-xl"
                    >
                        <h1 className=" px-2 text-lg font-extrabold hover:cursor-pointer">
                            {offer.carModel}
                        </h1>

                        <div className="flex">
                            <p className="text-primary border-l-2 border-gray-200 px-2">
                                {offer.name}
                            </p>
                            <p className="text-primary border-l-2 border-gray-200 px-2">
                                {formatPrice(offer.carPrice)}
                            </p>
                            <p className="text-primary border-l-2 border-gray-200 px-2">
                                {convertTimestampToCustomFormat(
                                    offer._createdOn
                                )}
                            </p>
                        </div>
                        <div className="flex border-l-2 border-r-2 border-gray-200 px-2 gap-2 ">
                            <button className="px-2 py-1 text-white  bg-green-500 hover:bg-green-600 rounded-lg">
                                Accept
                            </button>
                            <button className="px-2 py-1 text-white  bg-red-500 hover:bg-red-600 rounded-lg">
                                Decline
                            </button>
                            <button className="px-2 py-1 text-white  bg-blue-500 hover:bg-blue-600 rounded-lg">
                                Message Buyer
                            </button>
                        </div>
                        <p className="text-orange-400 bg-orange-100 rounded-lg px-2 ml-2">
                            Pending
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
