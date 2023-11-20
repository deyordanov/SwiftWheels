"use client";

//hooks
import { useState } from "react";

//next-image
import Image from "next/image";

//components
import { Carousel, IconButton } from "@material-tailwind/react";
import LoadingSpinner from "@/app/Components/shared/LoadingSpinner";
import FavoriteButton from "@/app/Components/shared/FavoriteButton";

//types
import * as galleryTypes from "../../utilities/types/gallery.types";

export default function Gallery({
    images,
    isPreview,
    car,
}: galleryTypes.propTypes) {
    const [loading, setLoading] = useState(
        new Array(images?.length).fill(true)
    );

    const handleImageLoad = (index: number) => {
        const newLoadingState = [...loading];
        newLoadingState[index] = false;
        setLoading(newLoadingState);
    };

    if (!images || images.length === 0) {
        return <LoadingSpinner />;
    }

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
            {images?.map((image: any, index: number) => (
                <div
                    key={image.fileUrl}
                    className="relative h-full w-full flex items-center justify-center"
                >
                    {loading[index] && <LoadingSpinner />}
                    <Image
                        src={image.fileUrl}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="absolute object-cover"
                        priority
                        onLoad={() => handleImageLoad(index)}
                    />

                    {!isPreview && <FavoriteButton car={car} />}
                </div>
            ))}
        </Carousel>
    );
}
