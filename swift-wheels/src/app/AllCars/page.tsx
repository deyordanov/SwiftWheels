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

//shared
import {
    formatPrice,
    convertTimestampToCustomFormat,
} from "../utilities/shared/shared";
import FavoriteButton from "../Components/shared/FavoriteButton";

export default function AllCars() {
    const [cars, setCars] = useState<Array<unknown>>([]);
    const [filters, setFilters] = useState<Array<object>>([]);

    useEffect(() => {
        getAllCars(filters);
    }, [filters]);

    const getAllCars = async (filters: any) => {
        try {
            const allCars = await carService.getAllFilter(filters);
            setCars(allCars);
        } catch (error) {
            console.log("Failed to fetch cars at UserListings", error);
        }
    };

    return (
        <section className="flex w-full h-full text-primary overflow-auto p-4">
            <div className="fixed top-0 left-0 h-full px-2 py-4 w-[20%]">
                <Filter setFilters={setFilters} />
            </div>
            <div className="ml-[20%] w-full h-full flex flex-col justify-center items-center gap-y-4">
                {cars?.map((car: any) => (
                    <div
                        key={car._id}
                        className="flex h-[25%] shadow-lg w-full max-w-[1400px] gap-4   rounded-lg"
                    >
                        <div className="relative w-[35%]">
                            <Link href={`/CarDetails/${car._id}`}>
                                <Image
                                    src={car["car-images"][1].url}
                                    alt={`${car["car-model"]} image`}
                                    fill
                                    className="object-cover  rounded-tl-lg rounded-bl-lg"
                                />
                            </Link>
                        </div>
                        <div className="relative flex flex-col justify-between py-4 pl-2 pr-8 gap-2 w-full">
                            <p className="text-secondary text-md">
                                {convertTimestampToCustomFormat(
                                    car?._createdOn
                                )}
                            </p>
                            <h1 className="text-4xl font-bold">
                                {car["car-model"]}
                            </h1>
                            <h2 className="text-2xl font-semibold text-accent-default">
                                {formatPrice(car["car-price"])}
                            </h2>
                            <p className="text-xl truncate">
                                {car["car-technical-description"].slice(
                                    0,
                                    Math.ceil(
                                        car["car-technical-description"]
                                            .length * 0.15
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

                            <FavoriteButton car={car} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
