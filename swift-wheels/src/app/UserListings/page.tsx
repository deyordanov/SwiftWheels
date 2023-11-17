"use client";

//hooks
import { useState, useEffect } from "react";

//services
import * as carService from "../../services/carService";

//next-image
import Image from "next/image";

//next-link
import Link from "next/link";

//components
import Filter from "./Filter/Filter";

export default function UserListings() {
    const [cars, setCars] = useState<Array<unknown>>([]);

    useEffect(() => {
        getAllCars();
    }, []);

    const getAllCars = async () => {
        try {
            const allCars = await carService.getAll();
            carService.getAllFilter([
                {
                    property: "car-price",
                    value: 216400,
                },
            ]);
            setCars(allCars);
        } catch (error) {
            console.log("Failed to fetch cars at UserListings", error);
        }
    };

    function convertTimestampToCustomFormat(timestamp: number) {
        const date = new Date(timestamp);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const time = date.toUTCString().match(/(\d{2}:\d{2}):\d{2}/)[1];
        return `${day}th of ${month} - ${time}`;
    }

    function formatPrice(price: number) {
        return `${price.toLocaleString("en-US")}$`;
    }

    return (
        <section className="flex w-full h-full text-primary overflow-auto px-4 py-8">
            <Filter />
            <div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
                {cars?.map((car: any) => (
                    <div
                        key={car._id}
                        className="flex h-[25%] w-full max-w-[1400px] gap-4 bg-gray-50"
                    >
                        <div className="relative w-full">
                            <Link href={`/CarDetails/${car._id}`}>
                                <Image
                                    src={car["car-images"][1].url}
                                    alt={`${car["car-model"]} image`}
                                    fill
                                    className="object-cover"
                                />
                            </Link>
                        </div>
                        <div className="flex flex-col justify-between py-4 pl-2 pr-8 gap-2 w-3/4">
                            <p className="text-secondary text-xl">
                                {convertTimestampToCustomFormat(
                                    car?._createdOn
                                )}
                            </p>
                            <h1 className="text-5xl font-bold">
                                {car["car-model"]}
                            </h1>
                            <h2 className="text-3xl font-semibold text-accent-default">
                                {formatPrice(car["car-price"])}
                            </h2>
                            <p className="text-xl truncate">
                                {car["car-technical-description"].slice(
                                    0,
                                    Math.ceil(
                                        car["car-technical-description"]
                                            .length * 0.2
                                    )
                                )}
                                ...
                            </p>
                            <p className="text-xl text-primary truncate">
                                {car["car-year"]} | {car["car-km"]} km |{" "}
                                {car["car-fuel-type"]} |{" "}
                                {car["car-transmission"]} |{" "}
                                {car["car-horsepower"]} HP
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
