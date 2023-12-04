"use client";

//hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

//services
import * as offerService from "@/services/offerService";

//components
import Offer from "./Offer/Offer";
import OfferFilter from "./OfferFilter/OfferFilter";

//next-image
import Image from "next/image";

//next-link
import Link from "next/link";

//components
import LoadingSpinner from "../Components/shared/LoadingSpinner";
import NoOffers from "./NoOffers/NoOffers";
import OfferSort from "./OfferSort/OfferSort";

//types
import React from "react";

export default function Page() {
    const queryClient = useQueryClient();
    const [offers, setOffers] = useState([]);
    const [filter, setFilter] = useState<string>(" ");
    const [sort, setSort] = useState<string>("");
    const [buyer, setBuyer] = useState<boolean>(false);
    const [seller, setSeller] = useState<boolean>(true);
    const { userId } = useAuthContext();

    const setSellerOffersQuery = useQuery({
        queryKey: ["offers", "sellerId", userId],
        queryFn: () => offerService.getAllOffersForSeller(userId, filter, sort),
        enabled: seller,
    });

    const setBuyerOffersQuery = useQuery({
        queryKey: ["offers", "buyerId", userId],
        queryFn: () => offerService.getAllOffersForBuyer(userId, filter, sort),
        enabled: buyer,
    });

    const areSellerOffersValid = !!setSellerOffersQuery.data;

    const areBuyerOffersValid = !!setBuyerOffersQuery.data;

    const isValidPresentData = offers.length !== 0;

    useEffect(() => {
        if (seller) {
            queryClient.fetchQuery({
                queryKey: ["offers", "sellerId", userId],
            });
        } else if (buyer) {
            queryClient.fetchQuery({
                queryKey: ["offers", "buyerId", userId],
            });
        }
    }, [filter, queryClient, seller, buyer, userId, sort]);

    useEffect(() => {
        if (areSellerOffersValid) {
            setOffers(setSellerOffersQuery.data);
        } else if (areBuyerOffersValid) {
            setOffers(setBuyerOffersQuery.data);
        } else if (setSellerOffersQuery.isError) {
            console.log(
                "Error loading offers in YourOffers.tsx:",
                setSellerOffersQuery.error
            );
        }
    }, [
        setBuyerOffersQuery,
        areBuyerOffersValid,
        setSellerOffersQuery,
        areSellerOffersValid,
    ]);

    useEffect(() => {
        if (!seller) {
            queryClient.removeQueries({
                queryKey: ["offers", "sellerId", userId],
                exact: true,
            });
        } else {
            queryClient.removeQueries({
                queryKey: ["offers", "buyerId", userId],
                exact: true,
            });
        }
    }, [buyer, queryClient, userId, seller]);

    const handleSetBuyer = () => {
        setBuyer(true);
        setSeller(false);
    };

    const handleSetSeller = () => {
        setSeller(true);
        setBuyer(false);
    };

    if (setSellerOffersQuery.isLoading || setBuyerOffersQuery.isLoading)
        return (
            <section className="w-screen h-screen flex items-center justify-centerq">
                <LoadingSpinner />
            </section>
        );

    return (
        <section className="flex text-primary flex-col relative z-10 items-center justify-center h-screen">
            <ul className="flex w-full h-full p-4 flex-col gap-y-4 relative max-w-[1400px]">
                <div className="flex gap-2 items-center">
                    <div className="flex items-start z-20 relative">
                        <OfferFilter setFilter={setFilter} />
                    </div>
                    <div className="flex items-start z-20 relative">
                        <OfferSort setSort={setSort} />
                    </div>
                    <div className="flex z-20 relative items-center text-2xl gap-4 font-semibold">
                        <button
                            disabled={buyer}
                            onClick={handleSetBuyer}
                            className="bg-gray-200 rounded-lg px-2 py-1 hover:bg-gray-300"
                        >
                            Buyer
                        </button>
                        <button
                            disabled={seller}
                            onClick={handleSetSeller}
                            className="bg-gray-200 rounded-lg px-2 py-1 hover:bg-gray-300"
                        >
                            Seller
                        </button>
                    </div>
                    <Link
                        href={"/"}
                        className="flex z-20 absolute items-center -right-6"
                    >
                        <Image
                            src={"/icons/logo4.png"}
                            width={170}
                            height={170}
                            alt="logo"
                            priority
                        />
                    </Link>
                </div>
                {isValidPresentData ? (
                    offers?.map((offer: any) => (
                        <Offer key={offer._id} offer={offer} />
                    ))
                ) : (
                    <NoOffers
                        setFilter={setFilter}
                        isValidPresentData={isValidPresentData}
                    />
                )}
            </ul>
        </section>
    );
}
