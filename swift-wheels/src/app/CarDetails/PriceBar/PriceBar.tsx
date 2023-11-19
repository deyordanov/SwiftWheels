"use client";

//hooks
import { memo, useEffect, useMemo } from "react";

//types
import * as priceBarTypes from "../../utilities/types/priceBar.types";

//shared
import { getRandomNumber, formatPrice } from "@/app/utilities/shared/shared";

export const PriceBar = memo(
    ({ carPrice, setBarPrice }: priceBarTypes.propTypes) => {
        const priceRanges = useMemo(
            () => ({
                topOffer: carPrice - carPrice * getRandomNumber(0.05, 0.1), // Randomizes between 5% to 10%
                veryGoodPrice:
                    carPrice - carPrice * getRandomNumber(0.01, 0.04), // Randomizes between 1% to 4%
                fairPrice: carPrice + carPrice * getRandomNumber(0.01, 0.03), // Randomizes between 1% to 3%
                higherPrice: carPrice + carPrice * getRandomNumber(0.04, 0.06), // Randomizes between 4% to 6%
                highPrice: carPrice + carPrice * getRandomNumber(0.07, 0.1), // Randomizes between 7% to 10%
            }),
            [carPrice]
        );

        useEffect(() => {
            if (carPrice <= priceRanges.topOffer) {
                setBarPrice(0.1);
            } else if (carPrice <= priceRanges.veryGoodPrice) {
                setBarPrice(0.2);
            } else if (carPrice <= priceRanges.fairPrice) {
                setBarPrice(0.3);
            } else if (carPrice <= priceRanges.higherPrice) {
                setBarPrice(0.4);
            } else {
                setBarPrice(0.5);
            }
        }, [carPrice, priceRanges, setBarPrice]);

        //Approxinmating based on the visual length of the range
        function getProgressBarStyles() {
            if (carPrice <= priceRanges.topOffer) {
                return "w-[8%] bg-green-500"; // Green for the best offers
            } else if (carPrice <= priceRanges.veryGoodPrice) {
                return "w-[30%] bg-green-400"; // Lighter green for very good offers
            } else if (carPrice <= priceRanges.fairPrice) {
                return "w-[53%] bg-yellow-400"; // Yellow for fair pricing
            } else if (carPrice <= priceRanges.higherPrice) {
                return "w-[74%] bg-orange-500"; // Orange for higher pricing
            } else {
                return "w-[100%] bg-red-500"; // Red for high pricing
            }
        }

        return (
            <div className="w-full p-4 bg-white rounded-lg shadow-2xl ml-4 border-2 border-gray-100">
                {/* Price Tags */}
                <div className="bg-green-500 text-white text-center py-2 rounded-t-lg shadow">
                    <span className="text-lg font-medium">CAR`S PRICE:</span>
                    <div className="text-3xl font-bold mt-1">
                        {formatPrice(carPrice)}
                    </div>
                </div>

                <div className="relative pt-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            className={`h-2 rounded-full ${getProgressBarStyles()}`}
                        ></div>
                    </div>

                    {/* Prices */}
                    <div className="flex justify-between px-2">
                        {Object.values(priceRanges).map((price) => (
                            <span key={price} className="text-xs">
                                $
                                {String(
                                    Number(price.toFixed(0)) / 1000
                                ).replace(".", ",")}
                            </span>
                        ))}
                    </div>

                    {/* Ranges */}
                    <div className="flex justify-between text-[12px] mt-4 -mx-2">
                        <div className="text-center px-2">
                            <div className="bg-green-500 text-white px-2 py-1 rounded-full">
                                Top offer
                            </div>
                        </div>
                        <div className="text-center px-2">
                            <div className="bg-green-400 text-white px-2 py-1 rounded-full">
                                Very good price
                            </div>
                        </div>
                        <div className="text-center px-2">
                            <div className="bg-yellow-400 text-white px-2 py-1 rounded-full">
                                Fair price
                            </div>
                        </div>
                        <div className="text-center px-2">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded-full">
                                Higher price
                            </div>
                        </div>
                        <div className="text-center px-2">
                            <div className="bg-red-500 text-white px-2 py-1 rounded-full">
                                High price
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-gray-600 text-center mt-4">
                        Compared with more than{" "}
                        <span className="font-semibold">
                            {getRandomNumber(50, 300).toFixed(0)} similar
                            vehicles
                        </span>{" "}
                        offered in recent months. We take into account up to{" "}
                        <span className="font-semibold">
                            {getRandomNumber(10, 48).toFixed(0)} vehicle
                            characteristics
                        </span>
                        .
                    </div>
                </div>
            </div>
        );
    }
);

PriceBar.displayName = "PriceBar";
