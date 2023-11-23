"use client";

//hooks
import { useCarDetailsContext } from "@/app/Contexts/carDetailsContext";

//components
import Gallery from "../Gallery/Gallery";
import CarLocationGoogleMap from "../GoogleMap/CarLocationGoogleMap";
import { PriceChart } from "../Chart/Chart";
import { PriceBar } from "../PriceBar/PriceBar";
import Offer from "../Offer/Offer";
import Description from "../Description/Description";
import OfferModal from "../OfferModal/OfferModal";

//next-link
import Link from "next/link";

//next-image
import Image from "next/image";

//shared
import { capitalizeWords } from "@/app/utilities/shared/shared";

//types
import React from "react";

export default function Page() {
    const {
        car,
        center,
        barPrice,
        setBarPrice,
        chartPrice,
        setChartPrice,
        isOfferModalOpen,
        setIsOfferModalOpen,
    } = useCarDetailsContext();

    return (
        <>
            <div className="relative container flex flex-col items-center mx-auto p-8 bg-white rounded-lg shadow-lg max-w-screen-lg text-black">
                <Link
                    href={"/"}
                    className="absolute cursor-pointer left-0 top-3"
                >
                    <Image
                        src={"/icons/logo4.png"}
                        width={240}
                        height={200}
                        alt="logo"
                        priority
                    />
                </Link>
                <div className="text-center p-5">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black uppercase tracking-tight leading-none">
                        {car["car-model"]}
                    </h1>
                </div>
                <div className="w-full flex flex-wrap gap-1 mb-4 justify-center">
                    {car["car-extras"]?.map((extra: string) => (
                        <span
                            key={extra}
                            className="bg-green-100 text-green-800 cursor-pointer text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                        >
                            {extra}
                        </span>
                    ))}
                </div>
                <div className="w-full mx-auto mb-14">
                    <Gallery
                        images={car["car-images"]}
                        car={car}
                        isPreview={false}
                    />
                </div>
                <div className="flex flex-1 w-full mb-4">
                    <div className="bg-gray-100 px-6 rounded-lg shadow-lg w-[80%]">
                        <ul className="divide-y divide-gray-200 text-xl flex flex-col justify-between h-full">
                            {Object.entries(car)
                                .filter(
                                    ([key]) =>
                                        ![
                                            "car-images",
                                            "car-price",
                                            "car-rating",
                                            "car-extras",
                                            "car-technical-description",
                                            "_ownerId",
                                            "userId",
                                            "userEmail",
                                            "_createdOn",
                                            "_id",
                                            "car-shop-address",
                                            "_updatedOn",
                                            "car-favorites",
                                        ].includes(key)
                                )
                                .map(([key, value]) => (
                                    <li
                                        key={key}
                                        className="py-4 flex justify-between items-center"
                                    >
                                        <span className="font-semibold capitalize">
                                            {capitalizeWords(key)}:
                                        </span>
                                        <span className="font-normal text-gray-700">
                                            {value as string}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="flex flex-col w-full h-full justify-between">
                        <div className="flex mb-8">
                            {car["car-price"] && (
                                <PriceBar
                                    carPrice={car["car-price"]}
                                    setBarPrice={setBarPrice}
                                />
                            )}
                        </div>
                        <div className="flex mb-8">
                            {/* Take the current car price and add 10000 to it, as this will be the initial price the year it was created */}
                            {car["car-price"] && (
                                <PriceChart
                                    initialPrice={car["car-price"] + 10000}
                                    year={car["car-year"]}
                                    setChartPrice={setChartPrice}
                                />
                            )}
                        </div>
                        <div className="flex-grow">
                            {barPrice !== 0 && chartPrice !== 0 && (
                                <Offer
                                    priceIndicator={barPrice + chartPrice}
                                    setIsOfferModalOpen={setIsOfferModalOpen}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {car["car-technical-description"] && (
                    <Description text={car["car-technical-description"]} />
                )}
                <div className="w-[100%] my-8 flex justify-center">
                    <CarLocationGoogleMap center={center} />
                </div>

                <div className="relative flex justify-center items-center content-center">
                    {car["car-price"] && (
                        <OfferModal
                            carPrice={car["car-price"]}
                            isOfferModalOpen={isOfferModalOpen}
                            setIsOfferModalOpen={setIsOfferModalOpen}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
