"use client";

import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";

const imageUrls = [
    "/images/carSlider/download.jpg",
    "/images/carSlider/lc1.jpg",
    "/images/carSlider/lc2.jpg",
    "/images/carSlider/lc3.jpg",
    "/images/carSlider/lc4.webp",
];

export default function Gallery() {
    return (
        <Carousel
            className="rounded-xl h-[550px] relative"
            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </IconButton>
            )}
        >
            {imageUrls.map((image) => (
                <div key={image} className="relative h-full w-full">
                    <Image
                        src={image}
                        alt=""
                        fill
                        objectFit="cover"
                        className="absolute"
                    />

                    <button className="hover:text-yellow-500 flex items-center absolute bottom-4 right-4 px-4 py-2 text-white rounded-full  transition ease-in-out duration-300">
                        <AiOutlineStar className=" text-xl mr-2" />
                        <span className="text-white">Add to Favorites</span>
                    </button>
                </div>
            ))}
        </Carousel>
    );
}