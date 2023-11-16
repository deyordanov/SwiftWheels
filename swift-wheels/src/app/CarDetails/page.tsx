"use client";
//hooks
import React, { useState, useEffect } from "react";

//components
import Gallery from "./Gallery/Gallery";
import CarLocationGoogleMap from "./GoogleMap/CarLocationGoogleMap";

//next-link
import Link from "next/link";

//next-image
import Image from "next/image";

//constants
import { carDetailsGeocodingApi } from "@/app/utilities/constants/constans";
import { PriceChart } from "./Chart/Chart";
import { PriceBar } from "./PriceBar/PriceBar";
import Offer from "./Offer/Offer";
import Description from "./Description/Description";
import OfferModal from "./OfferModal/OfferModal";

//This object would be injected from the outside
const car = {
    type: "SUV", //
    make: "Toyota", //
    name: "Land Cruiser 200", //
    model: "200", //
    price: "148.000$",
    stars: 5, //
    image: "/images/carSlider/LC200.png",
    km: "140 000km", //
    transmission: "Automatic", //
    condition: "Used", //
    year: "2020", //
    color: "Metallic", //
    "fuel type": "Diesel", //
    "engine size": "5L", //
    doors: "4", //
    cylinders: "8", //
    horsepower: "654HP", //
    "drive type": "4x4", //
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
    ], //
    techincalDescription:
        'The Toyota Land Cruiser 200 series is an iconic and robust SUV known for its ability to balance luxury with rugged off-road capabilities. It debuted in 2008, and even by the 2021 model year, it remained part of the 200 Series. Despite some criticisms regarding its dated features and styling, the Land Cruiser 200 series has maintained its reputation for being a highly capable vehicle, often referred to as a "backcountry beast" that doesn`t shy away from luxury​​. In terms of specifications, the Land Cruiser 200 series is available with either a 4.6-liter gasoline engine (1UR-FE) or a 4.5-liter diesel engine (1VD-FTV). The overall dimensions are 4950 mm in length (which can increase with a winch, spare tire, or bumper protector), 1970 mm in width, and 1890 mm in height (or 1905 mm with roof rails). It has a wheelbase of 2850 mm, a ground clearance of 225 mm, and various tire options including 285/65R17 and 285/60R18. The front suspension is a double wishbone type, while the rear features a 4 link coil rigid suspension with a lateral rod. The vehicle is equipped with ventilated disc brakes on both front and rear and has a 6-speed automatic transmission. Engine output varies with the gasoline version delivering 304 HP at 5500 rpm and the diesel 232 HP at 3200 rpm (when paired with a 6-speed automatic transmission)​​.',
    images: [
        "/images/carSlider/download.jpg",
        "/images/carSlider/lc1.jpg",
        "/images/carSlider/lc2.jpg",
        "/images/carSlider/lc3.jpg",
        "/images/carSlider/lc4.webp",
    ],
};

export default function Page() {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [barPrice, setBarPrice] = useState(0);
    const [chartPrice, setChartPrice] = useState(0);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

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
            <div className="relative container flex flex-col items-center mx-auto p-8 bg-white rounded-lg shadow-lg max-w-screen-lg text-black">
                <Link
                    href={"/"}
                    className="absolute cursor-pointer left-16 top-7"
                >
                    <Image
                        src={"/icons/logo4.png"}
                        width={200}
                        height={200}
                        alt="logo"
                        className=""
                        priority
                    />
                </Link>
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
                    <Gallery images={car.images} />
                </div>
                <div className="flex flex-1 w-full mb-4">
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
                                            "techincalDescription",
                                            "images",
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
                                <Offer
                                    priceIndicator={barPrice + chartPrice}
                                    setIsOfferModalOpen={setIsOfferModalOpen}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <Description text={car.techincalDescription} />
                </div>
                <div className="w-[80%] my-8 flex justify-center">
                    <CarLocationGoogleMap center={center} />
                </div>

                <div className="relative flex justify-center items-center content-center h-screen">
                    <OfferModal
                        car={car}
                        isOfferModalOpen={isOfferModalOpen}
                        setIsOfferModalOpen={setIsOfferModalOpen}
                    />
                </div>
            </div>
        </>
    );
}
