"use client";

//hooks
import { useEffect, useRef, useState } from "react";

//services
import * as carService from "../../../services/carService";

//swiper
import { register } from "swiper/element/bundle";
register();

//contexts
import { usePageContext } from "@/app/Contexts/pageContext";
import { useAuthContext } from "@/app/Contexts/authContext";

//swiper styles
import "swiper/css";

//next-image
import Image from "next/image";

//icons
import { FaStar, FaRegStar } from "react-icons/fa";

//motion
import { motion } from "framer-motion";

//next-link
import Link from "next/link";

//variants
import { fadeIn } from "../../../../variants";
import { useQuery } from "@tanstack/react-query";

export default function CarSlider() {
    const { isAuthenticated } = useAuthContext();
    const { handleLoginDialogExitOpen } = usePageContext();
    const [cars, setCars] = useState<unknown>([]);
    const swiperRef = useRef(null);

    function formatPrice(price: number) {
        return `${price.toLocaleString("en-US")}$`;
    }

    const getAllCarsQueery = useQuery({
        queryKey: ["cars"],
        queryFn: () => carService.getAll(),
    });

    useEffect(() => {
        if (!getAllCarsQueery.isLoading) {
            setCars(getAllCarsQueery.data);
        }
    }, [getAllCarsQueery]);

    useEffect(() => {
        register();

        const params = {
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 32 },
                1260: { slidesPerView: 3, spaceBetween: 32 },
            },
        };

        if (swiperRef.current) {
            Object.assign(swiperRef.current, params);

            const swiper = swiperRef.current as any;

            swiper.initialize();
        }
    }, []);

    function generateStars(rating: number) {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar className="text-xl" key={`full-${i}`} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar className="text-xl" key={`empty-${i}`} />);
        }

        return stars;
    }

    return (
        <motion.section
            variants={fadeIn("up", 0.4)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="container mx-auto"
        >
            <swiper-container init="false" ref={swiperRef}>
                {cars.map((car: any, index) => (
                    <swiper-slide key={index}>
                        <div className="max-w-[380px] mx-auto sm:mx-0 h-[500px] flex flex-col justify-evenly shadow-xl">
                            <span className="w-full overflow-hidden">
                                <Image
                                    src={car["car-images"][0].fileUrl}
                                    height={380}
                                    width={340}
                                    alt="Car Image"
                                    className="object-cover rounded-lg w-full max-h-[200px]"
                                />
                            </span>

                            <div className="flex justify-between px-4 py-2">
                                <div className="text-xl">
                                    <span className=" text-secondary uppercase">
                                        {car["car-type"]}
                                    </span>
                                    <h3 className="uppercase font-bold">
                                        {car["car-model"]}
                                    </h3>
                                    <h3 className="mb-10 text-accent-default font-semibold uppercase">
                                        {formatPrice(car["car-price"])}
                                    </h3>
                                </div>
                                <span className="flex">
                                    {generateStars(car["car-rating"])}
                                </span>
                            </div>
                            <div className="flex gap-x-3 xl:gap-x-4 mb-10 items-center justify-between content-between w-full px-4">
                                <div className="flex flex-col items-center">
                                    <span className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                                        <Image
                                            src={
                                                "icons/carSlider/automatic.svg"
                                            }
                                            width={24}
                                            height={24}
                                            alt=""
                                        />
                                    </span>
                                    <span className="text-[18px]  text-center">
                                        {car["car-transmission"]}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <span className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                                        <Image
                                            src={"icons/carSlider/gas.svg"}
                                            width={24}
                                            height={24}
                                            alt=""
                                        />
                                    </span>
                                    <span className="text-[18px]  text-center">
                                        {car["car-fuel-type"]}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                                        <Image
                                            src={"icons/carSlider/engine.svg"}
                                            width={24}
                                            height={24}
                                            alt=""
                                        />
                                    </span>
                                    <span className="text-[18px]  text-center">
                                        {`${car["car-horsepower"]} HP`}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                                        <Image
                                            src={"icons/carSlider/wheel.svg"}
                                            width={24}
                                            height={24}
                                            alt=""
                                        />
                                    </span>
                                    <span className="text-[18px]  text-center">
                                        {car["car-drive-type"]}
                                    </span>
                                </div>
                            </div>
                            {/* If the user has logged in - display the details, oterwise direct them to the login dialog */}
                            {isAuthenticated ? (
                                <Link
                                    className="btn btn-accent btn-lg"
                                    href={`/CarDetails/${car._id}`}
                                >
                                    See Details
                                </Link>
                            ) : (
                                <button
                                    className="btn btn-accent btn-lg"
                                    onClick={handleLoginDialogExitOpen}
                                >
                                    See Details
                                </button>
                            )}
                        </div>
                    </swiper-slide>
                ))}
            </swiper-container>
        </motion.section>
    );
}
