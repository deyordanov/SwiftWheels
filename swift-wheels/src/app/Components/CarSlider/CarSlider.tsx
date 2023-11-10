"use client";

//hooks
import { useEffect, useRef, useState } from "react";

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

//variants
import { fadeIn } from "../../../../variants";
import Link from "next/link";

//cars data
const cars = [
    {
        type: "SUV",
        name: "BMW X5",
        price: 60,
        stars: 4,
        image: "/images/carSlider/BMW-X5.png",
        info: [
            { icon: "icons/carSlider/automatic.svg", text: "Automatic" },
            { icon: "icons/carSlider/seat.svg", text: "5 Seats" },
            { icon: "icons/carSlider/gas.svg", text: "Petrol" },
            { icon: "icons/carSlider/engine.svg", text: "335 HP" },
            { icon: "icons/carSlider/wheel.svg", text: "All Wheel" },
        ],
    },
    {
        type: "Sedan",
        name: "Mercedes-Benz S-Class",
        price: 110,
        stars: 4.2,
        image: "/images/carSlider/Sclass.png",
        info: [
            { icon: "icons/carSlider/automatic.svg", text: "Automatic" },
            { icon: "icons/carSlider/seat.svg", text: "5 Seats" },
            { icon: "icons/carSlider/gas.svg", text: "Petrol" },
            { icon: "icons/carSlider/engine.svg", text: "429 HP" },
            { icon: "icons/carSlider/wheel.svg", text: "Rear Wheel" },
        ],
    },
    {
        type: "Sports Car",
        name: "Porsche 911",
        price: 100,
        stars: 3.9,
        image: "/images/carSlider/911.png",
        info: [
            { icon: "icons/carSlider/gearshift.svg", text: "Manual" },
            { icon: "icons/carSlider/seat.svg", text: "4 Seats" },
            { icon: "icons/carSlider/gas.svg", text: "Petrol" },
            { icon: "icons/carSlider/engine.svg", text: "379 HP" },
            { icon: "icons/carSlider/wheel.svg", text: "Rear Wheel" },
        ],
    },
    {
        type: "Sports Car",
        name: "Lamborghini Huracan",
        price: 261,
        stars: 4.4,
        image: "/images/carSlider/Huracan.png",
        info: [
            { icon: "icons/carSlider/automatic.svg", text: "Automatic" },
            { icon: "icons/carSlider/seat.svg", text: "2 Seats" },
            { icon: "icons/carSlider/gas.svg", text: "Petrol" },
            { icon: "icons/carSlider/engine.svg", text: "602 HP" },
            { icon: "icons/carSlider/wheel.svg", text: "All Wheel" },
        ],
    },
    {
        type: "SUV",
        name: "Land Cruiser 200",
        price: 148,
        stars: 5,
        image: "/images/carSlider/LC200.png",
        info: [
            { icon: "icons/carSlider/automatic.svg", text: "Automatic" },
            { icon: "icons/carSlider/seat.svg", text: "5 Seats" },
            { icon: "icons/carSlider/gas.svg", text: "Petrol" },
            { icon: "icons/carSlider/engine.svg", text: "654 HP" },
            { icon: "icons/carSlider/wheel.svg", text: "All Wheel" },
        ],
    },
];

export default function CarSlider() {
    const { isAuthenticated } = useAuthContext();
    const { handleLoginDialogExitOpen } = usePageContext();
    const [showDetials, setShowDetails] = useState(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        // Register Swiper web component
        register();

        // Object with parameters
        const params = {
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 32 },
                1260: { slidesPerView: 3, spaceBetween: 32 },
            },
        };

        if (swiperRef.current) {
            // Assign it to swiper element
            Object.assign(swiperRef.current, params);

            //Can`t initialize in any other way due to typescript
            const swiper = swiperRef.current as any;

            // initialize swiper
            swiper.initialize();
        }
    }, []);

    function generateStars(rating: number) {
        const fullStars = Math.floor(rating);
        // const halfStars = rating % 1 ? 1 : 0;
        const emptyStars = 5 - fullStars; // assuming a maximum of 5 stars

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} />);
        }

        return stars;
    }

    const handleDetails = () => {
        setShowDetails((state) => !state);
    };

    return (
        <motion.section
            variants={fadeIn("up", 0.4)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="container mx-auto"
        >
            <swiper-container init="false" ref={swiperRef}>
                {cars.map((car, index) => (
                    <swiper-slide key={index}>
                        <div className="max-w-[385px] mx-auto sm:mx-0 h-[500px]  flex flex-col justify-evenly">
                            <span className="h-[200px]">
                                <Image
                                    src={car.image}
                                    height={380}
                                    width={
                                        car.name === "Toyota RAV4" ? 1000 : 340
                                    }
                                    alt="image"
                                />
                            </span>
                            <div className="flex justify-between">
                                <div>
                                    <span className="text-[13px] text-secondary uppercase">
                                        {car.type}
                                    </span>
                                    <h3 className="text-lg uppercase font-bold">
                                        {car.name}
                                    </h3>
                                    <h3 className="mb-10 text-accent-default font-semibold uppercase">
                                        {`${car.price}.000$`}
                                    </h3>
                                </div>
                                <span className="flex">
                                    {generateStars(car.stars)}
                                </span>
                            </div>
                            <div className="flex gap-x-3 xl:gap-x-4 w-max mb-10">
                                {car.info.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center"
                                    >
                                        <span className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                                            <Image
                                                src={item.icon}
                                                width={24}
                                                height={24}
                                                alt=""
                                            />
                                        </span>
                                        <span className="text-[12px] uppercase">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/* If the user has logged in - display the details, oterwise direct them to the login dialog */}
                            {isAuthenticated ? (
                                <Link
                                    className="btn btn-accent btn-lg"
                                    href={"/CarDetails"}
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
