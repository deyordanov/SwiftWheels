"use client";

//hooks
import { useAuthContext } from "../Contexts/authContext";

//services
import * as offerService from "@/services/offerService";

//components
import Offer from "./Offer/Offer";

//types
import React, { useEffect, useState } from "react";

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
            <ul className="flex flex-col h-full gap-4 ">
                {offers?.map((offer: any) => (
                    <Offer key={offer._id} offer={offer} />
                ))}
            </ul>
        </section>
    );
}
