"use client";

//hooks
import { useAuthContext } from "../Contexts/authContext";
import { useQuery } from "@tanstack/react-query";

//services
import * as offerService from "@/services/offerService";

//components
import Offer from "./Offer/Offer";

//types
import React, { useEffect, useState } from "react";

// TODO: Add filtration!
export default function Page() {
    const [offers, setOffers] = useState([]);
    const { userId } = useAuthContext();

    const setOffersQuery = useQuery({
        queryKey: ["offers", userId],
        queryFn: () => offerService.getAllFilter(userId),
    });

    const isValidData =
        setOffersQuery.data && Object.values(setOffersQuery.data).length !== 0;

    useEffect(() => {
        if (isValidData) {
            setOffers(setOffersQuery.data);
        } else if (setOffersQuery.isError) {
            console.log(
                "Error loading offers in YourOffers.tsx:",
                setOffersQuery.error
            );
        }
    }, [setOffersQuery, isValidData]);

    return (
        <section className="container flex items-center justify-center h-screen w-screen mx-auto mt-2 text-primary font-semibold pt-4">
            <ul className="flex flex-col h-full gap-4 ">
                {offers?.map((offer: any) => (
                    <Offer key={offer._id} offer={offer} />
                ))}
            </ul>
        </section>
    );
}
