"use client";

//hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/Contexts/authContext/authContext";

//services
import * as carService from "../../../services/carService";

//react-icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

//tanstack query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// types
import * as componentsFavoriteButtonTypes from "./componentsFavoriteButton.types";

export default function FavoriteButton({
    car,
}: {
    car: componentsFavoriteButtonTypes.Car;
}) {
    const queryClient = useQueryClient();
    const [isFavorite, setIsFavorite] = useState(false);
    const { userId } = useAuthContext();

    const addUserToFavoritesMutation = useMutation({
        mutationKey: ["cars", car._id as "carId", userId],
        mutationFn: () => carService.addUserToFavorites(car._id, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars"],
                exact: false,
            });
        },
    });

    const removeUserFromFavoritesMutation = useMutation({
        mutationKey: ["cars", car._id as "carId", userId],
        mutationFn: () => carService.removeUserFromFavorites(car._id, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars"],
                exact: false,
            });
        },
    });

    useEffect(() => {
        setIsFavorite(car["car-favorites"].includes(userId));
    }, [car, userId]);

    const toggleFavorite = () => {
        setIsFavorite((state) => {
            if (!state) {
                addUserToFavoritesMutation.mutate();
            } else {
                removeUserFromFavoritesMutation.mutate();
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
