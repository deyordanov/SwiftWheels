"use client";

//hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/Contexts/authContext";

//services
import * as carService from "../../../services/carService";

//react-icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function FavoriteButton({ car }: { car: any }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { userId } = useAuthContext();

    useEffect(() => {
        setIsFavorite(car["car-favorites"].includes(userId));
    }, [car, userId]);

    const toggleFavorite = () => {
        console.log("toggle");
        setIsFavorite((state) => {
            if (!state) {
                carService.addUserToFavorites(car._id, userId);
            } else {
                carService.removeUserFromFavorites(car._id, userId);
            }
            return !state;
        });
    };

    return (
        <button
            onClick={toggleFavorite}
            className="text-xl flex items-center absolute bottom-2 right-2 px-4 py-2 rounded-full  transition ease-in-out duration-300 text-black"
        >
            {isFavorite ? (
                <AiFillStar className="text-3xl mr-2 text-yellow-500" />
            ) : (
                <AiOutlineStar className="text-3xl mr-2 hover:text-yellow-500" />
            )}
            <span className="text-primary">Add to Favorites</span>
        </button>
    );
}
