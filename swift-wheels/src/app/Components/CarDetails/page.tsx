"use client";
//hooks
import React, { useState, useEffect } from "react";

//components
import Gallery from "./Gallery/Gallery";
import CarLocationGoogleMap from "./GoogleMap/CarLocationGoogleMap";

//constants
import { carDetailsGeocodingApi } from "@/app/utilities/constants/constans";
import PriceChart from "./Chart/Chart";
import PriceBar from "./PriceBar/PriceBar";
import Offer from "./Offer/Offer";
import Header from "../Header/Header";

//This object would be injected from the outside
const car = {
    type: "SUV",
    make: "Toyota",
    name: "Land Cruiser 200",
    model: "200",
    price: "148.000$",
    stars: 5,
    image: "/images/carSlider/LC200.png",
    km: "140 000km",
    transmission: "Automatic",
    condition: "Used",
    year: "2020",
    color: "Metallic",
    "fuel type": "Diesel",
    "engine size": "5L",
    doors: "4",
    cylinders: "8",
    horsepower: "654HP",
    "drive type": "4x4",
    extras: [
        "Advanced Navigation System",
        "Premium Leather Upholstery",
        "Heated and Ventilated Front Seats",
        "Rear-Seat Entertainment System",
        "Adaptive Cruise Control",
        "Blind Spot Monitoring",
        "360-degree Camera System",
        "Enhanced Off-Road Capabilities Package",
        "Premium JBL Sound System",
        "Panoramic Sunroof",
        "Wireless Charging Pad",
        "Power Tailgate with Gesture Control",
        "Multi-Terrain Select with Crawl Control",
        "LED Headlights with Automatic High Beams",
        "Head-Up Display",
    ],
};

export default function Page() {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [barPrice, setBarPrice] = useState(0);
    const [chartPrice, setChartPrice] = useState(0);

    //This address will be injected from the outside
    const address = "Heidestraße 62 10557 Berlin Germany";
    useEffect(() => {
        const geocodeAddress = async (addressToGeocode: string) => {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
            const url = new URL(carDetailsGeocodingApi);
            //Creating the query string
            const params = new URLSearchParams({
                address: addressToGeocode,
                key: apiKey,
            });
            url.search = params.toString(); // -> URL encoded query string

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.results[0]) {
                    const { lat, lng } = data.results[0].geometry.location;
                    setCenter({ lat, lng });
                } else {
                    console.error(
                        "No results for the address: ",
                        addressToGeocode
                    );
                }
            } catch (error) {
                console.error("Geocoding error: ", error);
            }
        };

        if (address) {
            geocodeAddress(address);
        }
    }, [address]);

    return (
        <>
            <Header />
            <div className="container flex flex-col items-center mx-auto p-8 bg-white rounded-lg shadow-lg max-w-screen-lg">
                <div className="text-center p-5">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black uppercase tracking-tight leading-none">
                        {car.name}
                    </h1>
                </div>
                <div className="w-full flex flex-wrap gap-1 mb-4 justify-center">
                    {car.extras.map((extra) => (
                        <span
                            key={extra}
                            className="bg-green-100 text-green-800 cursor-pointer text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                        >
                            {extra}
                        </span>
                    ))}
                </div>
                <div className="w-full mx-auto mb-14">
                    <Gallery />
                </div>
                <div className="flex flex-1 w-full">
                    <div className="bg-gray-100 px-6 rounded-lg shadow-lg w-[80%]">
                        <ul className=" divide-y divide-gray-200 text-xl">
                            {Object.entries(car)
                                .filter(
                                    ([key]) =>
                                        ![
                                            "image",
                                            "info",
                                            "name",
                                            "price",
                                            "stars",
                                            "extras",
                                        ].includes(key) //Filter out the keys we need
                                )
                                .map(([key, value]) => (
                                    <li
                                        key={key}
                                        className="py-4 flex justify-between items-center"
                                    >
                                        {/* Replce _ with ' ' */}
                                        <span className="font-semibold capitalize">
                                            {key.replace(/_/g, " ")}:
                                        </span>
                                        <span className="font-normal text-gray-700">
                                            {value}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="flex flex-col w-full h-full justify-between">
                        <div className="flex mb-8">
                            <PriceBar
                                initialPrice={car.price}
                                setBarPrice={setBarPrice}
                            />
                        </div>
                        <div className="flex mb-8">
                            {/* Take the current car price and add 10000 to it, as this will be the initial price the year it was created */}
                            <PriceChart
                                initialPrice={148000 + 10000}
                                year="2020"
                                setChartPrice={setChartPrice}
                            />
                        </div>
                        <div className="flex-grow">
                            {/* TODO: Display a contact form / offer form when the offer button is clicked? */}
                            {barPrice !== 0 && chartPrice !== 0 && (
                                <Offer priceIndicator={barPrice + chartPrice} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-[80%] my-8 flex justify-center">
                    <CarLocationGoogleMap center={center} />
                </div>
            </div>
        </>
    );
}
