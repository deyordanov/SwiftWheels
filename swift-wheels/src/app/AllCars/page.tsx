"use client";

//hooks
import { useState, useEffect } from "react";

//services
import * as carService from "../../services/carService";

//react-hook-form
import { useQuery } from "@tanstack/react-query";

//next-image
import Image from "next/image";

//next-link
import Link from "next/link";

//components
import Filter from "./Filter/Filter";
import FavoriteButton from "../Components/shared/FavoriteButton";
import { AllCarsPagination } from "./AllCarsPagination/AllCarsPagination";
import NotFound from "../Components/shared/NotFound";

//constants
import {
    allCarsPageSize,
    createCarFormKeys,
} from "@/app/utilities/constants/constans";

//shared
import {
    formatPrice,
    convertTimestampToEuropeanFormat,
} from "../utilities/shared/shared";

//types
import * as AllCarsTypes from "./allCars.types";

//styles
import "./AllCars.css";

export default function AllCars() {
    const [cars, setCars] = useState<Array<AllCarsTypes.Car>>([]);
    const [filters, setFilters] = useState<Array<object>>([]);
    const [page, setPage] = useState<number>(1);

    const getAllCarsQuery = useQuery({
        queryKey: ["cars", filters, page],
        queryFn: () => carService.getAllFilter(filters, page, allCarsPageSize),
        enabled: !!filters,
    });

    useEffect(() => {
        const getAllCars = async () => {
            if (!getAllCarsQuery.isLoading) {
                setCars(getAllCarsQuery?.data?.cars);
            } else if (getAllCarsQuery.isError) {
                console.log(
                    "Failed to fetch cars at UserListings",
                    getAllCarsQuery.error
                );
            }
        };

        getAllCars();
    }, [getAllCarsQuery]);

    const isValidPresentData = cars.length !== 0;

    return (
        <section className="flex justify-center items-center h-screen w-screen overflow-hidden">
            <div className="flex text-primary min-w-[1700px]">
                <aside className="sticky top-0 left-0 h-full px-2 w-[25%] overflow-y-auto">
                    <Filter setFilters={setFilters} />
                </aside>
                {!isValidPresentData ? (
                    <div className="w-[75%] items-center justify-center">
                        <NotFound message="No cars have been found!" />
                    </div>
                ) : (
                    <div className="w-[75%] relative overflow-auto hide-scrollbar">
                        <main className="absolute top-0 left-0 flex w-full px-4 flex-col overflow-hidden">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
                                {cars?.map((car: AllCarsTypes.Car) => (
                                    <div
                                        key={car._id}
                                        className="flex h-[25%] shadow-lg w-full max-w-[1400px] gap-4 rounded-lg"
                                    >
                                        <div className="relative min-w-[30%]">
                                            <Link
                                                href={`/CarDetails/${car._id}`}
                                            >
                                                <Image
                                                    src={
                                                        car["car-images"][1].url
                                                    }
                                                    alt={`${car["car-model"]} image`}
                                                    fill
                                                    className="object-cover rounded-tl-lg rounded-bl-lg"
                                                />
                                            </Link>
                                        </div>
                                        <div className="relative flex flex-col justify-between py-4 pl-2 pr-8 gap-2 w-full">
                                            <p className="text-secondary text-xl">
                                                {convertTimestampToEuropeanFormat(
                                                    car?._createdOn
                                                )}
                                            </p>
                                            <h1 className="text-4xl font-bold">
                                                {car["car-model"]}
                                            </h1>
                                            <h2 className="text-2xl font-semibold text-accent-default">
                                                {formatPrice(car["car-price"])}
                                            </h2>
                                            <div className="max-w-[50%]">
                                                <p className="text-xl truncate">
                                                    {car[
                                                        "car-technical-description"
                                                    ].slice(
                                                        0,
                                                        Math.ceil(
                                                            car[
                                                                "car-technical-description"
                                                            ].length * 0.15
                                                        )
                                                    )}
                                                    ...
                                                </p>
                                            </div>
                                            <p className="text-xl text-primary truncate">
                                                {car["car-year"]} |{" "}
                                                {car["car-km"]} km |{" "}
                                                {car["car-fuel-type"]} |{" "}
                                                {car["car-transmission"]} |{" "}
                                                {car["car-horsepower"]} HP
                                            </p>

                                            {/* <FavoriteButton car={car} /> */}
                                        </div>
                                    </div>
                                ))}
                                <div className="relative bottom-0 px-2 py-4 w-full h-full">
                                    <AllCarsPagination
                                        filters={filters}
                                        carsCount={
                                            getAllCarsQuery.data?.carsCount ?? 0
                                        }
                                        setPage={setPage}
                                        pageSize={allCarsPageSize}
                                    />
                                </div>
                            </div>
                        </main>
                    </div>
                )}
            </div>
        </section>
    );
}
