"use client";

//hooks
import {
    useContext,
    createContext,
    useState,
    useCallback,
    useEffect,
} from "react";

//next-navigation
import { useParams } from "next/navigation";

//tanstack query
import { useQuery } from "@tanstack/react-query";

//services
import * as carService from "../../services/carService";

//types
import * as carDetailsContextTypes from "../utilities/types/carDetailsContext.types";

//shared
import { geocodeAddress } from "../utilities/shared/shared";

const CarDetailsContext = createContext<
    carDetailsContextTypes.carDetailsContextData | undefined
>(undefined);

export const CarDetailsProvider = ({
    children,
}: carDetailsContextTypes.propTypes) => {
    const searchParams = useParams();
    const [car, setCar] = useState<any>({});
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 0,
        lng: 0,
    });
    const [barPrice, setBarPrice] = useState<number>(0);
    const [chartPrice, setChartPrice] = useState<number>(0);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);

    const getCarQuery = useQuery({
        queryKey: [searchParams.id],
        queryFn: () => carService.getOne(searchParams.id as string),
    });

    const getCar = useCallback(async () => {
        if (searchParams.id && !getCarQuery.isLoading) {
            setCar(getCarQuery?.data);
        } else if (getCarQuery.isError) {
            console.log(
                "Error loading vehicle in CarDetails:",
                getCarQuery.error
            );
        }
    }, [getCarQuery, searchParams]);

    useEffect(() => {
        getCar();
    }, [getCar]);

    useEffect(() => {
        if (car["car-shop-address"]) {
            geocodeAddress(car["car-shop-address"], setCenter);
        }
    }, [car]);

    const carDetailsContextData = {
        car,
        center,
        barPrice,
        setBarPrice,
        chartPrice,
        setChartPrice,
        isOfferModalOpen,
        setIsOfferModalOpen,
    };

    return (
        <CarDetailsContext.Provider value={carDetailsContextData}>
            {children}
        </CarDetailsContext.Provider>
    );
};

export const useCarDetailsContext = () => {
    const context = useContext(CarDetailsContext);

    if (context === undefined) {
        throw new Error(
            "useCreateCarContext must be used within an AuthProvider"
        );
    }

    return context;
};
