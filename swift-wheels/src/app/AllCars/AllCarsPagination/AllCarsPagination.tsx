"use client";

//hooks
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//services
import * as carService from "@/services/carService";

//components
import LoadingSpinner from "@/app/Components/shared/LoadingSpinner";

//material-tailwind
import { IconButton, Typography } from "@material-tailwind/react";

//react-icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//types
import * as allCarsPaginationTypes from "@/app/utilities/types/allCarsPagination.types";

export function AllCarsPagination({
    filters,
    carsCount,
    setPage,
    pageSize,
}: allCarsPaginationTypes.propTypes) {
    const [active, setActive] = useState(1);
    const [carCount, setCarCount] = useState(1);
    const carCountQuery = useQuery({
        queryKey: ["cars", "carCount"],
        queryFn: () => carService.getCarCount(),
    });

    useEffect(() => {
        setActive(1);
    }, [filters]);

    useEffect(() => {
        if (carsCount) {
            setCarCount(Math.ceil(carsCount / pageSize));
        }
    }, [carsCount, pageSize]);

    const next = () => {
        if (active === carCount) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    useEffect(() => {
        setPage(active);
    }, [active, setPage]);

    return (
        <div className="flex items-center gap-8 justify-center mt-2 ">
            {carsCount === 0 ? (
                <LoadingSpinner />
            ) : (
                <>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={prev}
                        disabled={active === 1}
                        className="text-xl"
                    >
                        <FaArrowLeft />
                    </IconButton>
                    <Typography color="gray" className="font-normal text-xl">
                        Page{" "}
                        <strong className="text-gray-900 text-xl">
                            {active}
                        </strong>{" "}
                        of{" "}
                        <strong className="text-gray-900 text-xl">
                            {carCount}
                        </strong>
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={next}
                        disabled={active === carCount}
                        className="text-xl"
                    >
                        <FaArrowRight />
                    </IconButton>
                </>
            )}
        </div>
    );
}
