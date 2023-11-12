"use client";

//hooks
import { memo } from "react";

//types
import * as priceBarTypes from "../../utilities/types/priceBar.types";

export const PriceBar = memo(
    ({ initialPrice, setBarPrice }: priceBarTypes.propTypes) => {
        const carPrice = Number(initialPrice.replace("$", "").replace(".", ""));
        // Function to generate a random number within a range
        function getRandomNumber(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const priceRanges = {
            topOffer: carPrice - carPrice * getRandomNumber(0.05, 0.1), // Randomizes between 5% to 10%
            veryGoodPrice: carPrice - carPrice * getRandomNumber(0.01, 0.04), // Randomizes between 1% to 4%
            fairPrice: carPrice + carPrice * getRandomNumber(0.01, 0.03), // Randomizes between 1% to 3%
            higherPrice: carPrice + carPrice * getRandomNumber(0.04, 0.06), // Randomizes between 4% to 6%
            highPrice: carPrice + carPrice * getRandomNumber(0.07, 0.1), // Randomizes between 7% to 10%
        };

        //Approxinmating based on the visual length of the range
        function getProgressBarWidthClass(price: number) {
            if (price <= priceRanges.topOffer) {
                return "w-[8%]";
            } else if (price <= priceRanges.veryGoodPrice) {
                return "w-[30%]";
            } else if (price <= priceRanges.fairPrice) {
                return "w-[53%]";
            } else if (price <= priceRanges.higherPrice) {
                return "w-[74%]";
            } else {
                return "w-[100%]";
            }
        }

        function getProgressBarColorClass(price: number) {
            if (price <= priceRanges.topOffer) {
                setBarPrice(0.1);
                return "bg-green-500"; // Green for the best offers
            } else if (price <= priceRanges.veryGoodPrice) {
                setBarPrice(0.2);
                return "bg-green-400"; // Lighter green for very good offers
            } else if (price <= priceRanges.fairPrice) {
                setBarPrice(0.3);
                return "bg-yellow-400"; // Yellow for fair pricing
            } else if (price <= priceRanges.higherPrice) {
                setBarPrice(0.4);
                return "bg-orange-500"; // Orange for higher pricing
            } else {
                setBarPrice(0.5);
                return "bg-red-500"; // Red for high pricing
            }
        }

        return (
            <div className="w-full p-4 bg-white rounded-lg shadow-2xl ml-4 border-2 border-gray-100">
                {/* Price Tags */}
                <div className="bg-green-500 text-white text-center py-2 rounded-t-lg shadow">
                    <span className="text-lg font-medium">CAR`S PRICE:</span>
                    <div className="text-3xl font-bold mt-1">
                        {initialPrice}
                    </div>
                </div>

                <div className="relative pt-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            className={`h-2 rounded-full ${getProgressBarWidthClass(
                                carPrice
                            )} ${getProgressBarColorClass(carPrice)}`}
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
