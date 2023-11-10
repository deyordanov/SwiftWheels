"use client";

import React from "react";

export default function PriceBreakdown({ basePrice, additionalCosts }) {
    const calculateTotal = () => {
        const additionalCostsTotal = additionalCosts.reduce(
            (total, cost) => total + cost.amount,
            0
        );
        return basePrice + additionalCostsTotal;
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold border-b pb-2">
                Price Breakdown
            </h3>
            <div className="mt-2">
                <div className="flex justify-between py-2">
                    <span>Base Price:</span>
                    <span>${basePrice}</span>
                </div>
                {additionalCosts.map((cost, index) => (
                    <div
                        className="flex justify-between py-2 border-t"
                        key={index}
                    >
                        <span>{cost.label}:</span>
                        <span>${cost.amount}</span>
                    </div>
                ))}
                <div className="flex justify-between py-2 border-t font-semibold">
                    <span>Total Price:</span>
                    <span>${calculateTotal()}</span>
                </div>
            </div>
        </div>
    );
}
