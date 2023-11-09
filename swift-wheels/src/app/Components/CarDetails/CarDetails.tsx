"use client";
//hooks
import React, { useState, useEffect } from "react";

//react-icons
import { AiOutlineStar } from "react-icons/ai";

//components
import Gallery from "./Gallery/Gallery";
import CarLocationGoogleMap from "./GoogleMap/CarLocationGoogleMap";

//constants
import { carDetailsGeocodingApi } from "@/app/utilities/constants/constans";
import PriceChart from "./Chart/Chart";
import PriceBar from "./PriceBar/PriceBar";
import Offer from "./Offer/Offer";

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
};

export default function CarDetails() {
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
        <div className="container flex flex-col items-center mx-auto p-8 bg-white rounded-lg shadow-lg max-w-screen-lg">
            <div className="text-center my-8">
                <h1 className="h1 mb-2">{car.name}</h1>
                <h2 className="text-5xl font-extrabold text-accent-default my-4">
                    {car.price}
                </h2>
                <button className="flex items-center mb-6 mx-auto px-6 py-3 bg-accent-default text-white rounded-full hover:bg-accent-hover transition duration-300 ease-in-out">
                    <AiOutlineStar className="text-xl mr-2" />
                    Add to favorites
                </button>
            </div>
            <div className="max-w-4xl mx-auto mb-14">
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
    );
}
