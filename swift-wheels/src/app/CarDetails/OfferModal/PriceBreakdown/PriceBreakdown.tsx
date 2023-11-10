"use client";

import React from "react";

export default function PriceBreakdown({ basePrice }: { basePrice: number }) {
    const additionalCosts = [
        {
            label: "Sales Tax",
            amount: 0.04, // Approximately 4% from the total price
        },
        {
            label: "Documentation Fee",
            amount: 0.005, // Approximately 0.5% from the total price
        },
        {
            label: "Title and Registration Fees",
            amount: 0.001, // Approximately 0.1% from the total price
        },
        {
            label: "Transportation Fee",
            amount: 0.01, // Approximately 1% from the total price
        },
        {
            label: "Extended Warranty",
            amount: Math.random() * (0.02 - 0.005) + 0.005, // Approximately 0.5-2% from the total price
        },
        {
            label: "Credit Insurance",
            amount: Math.random() * (0.02 - 0.005) + 0.005, // Approximately 0.5-2% from the total price
        },
        {
            label: "Tuning",
            amount: Math.random() * (0.1 - 0.03) + 0.03, // Approximately 3-10% from the total price
        },
        {
            label: "Emissions Testing and Compliance Fees",
            amount: 0.003, // Approximately 0.3% from the total price
        },
    ];

    const calculateTotal = () => {
        const additionalCostsTotal = additionalCosts.reduce(
            (total, cost) => total + cost.amount * basePrice,
            0
        );
        return basePrice + additionalCostsTotal;
    };

    function formatPrice(price: number): string {
        // Create our number formatter with 'en-US' locale.
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2, // Ensure minimum two digits after the decimal
            maximumFractionDigits: 2, // Ensure maximum two digits after the decimal
        });

        // Format the price and return
        return formatter.format(price);
    }

    return (
        <div className="p-4 max-w-md flex flex-col">
            <h3 className="text-lg font-semibold border-b pb-2">
                Price Breakdown
            </h3>
            <div className="flex flex-col">
                <div className="flex justify-between py-2 ">
                    <span>Base Price:</span>
                    <span>${formatPrice(basePrice)}</span>
                </div>
                {additionalCosts.map((cost, index) => (
                    <div
                        className="flex justify-between py-2 border-t gap-x-4"
                        key={index}
                    >
                        <span>{cost.label}:</span>
                        <span>${formatPrice(cost.amount * basePrice)}</span>
                    </div>
                ))}
                <div className="flex justify-between py-2 border-t font-semibold text-xl pt-4">
                    <span>Total Price:</span>
                    <span>${formatPrice(calculateTotal())}</span>
                </div>
            </div>
        </div>
    );
}
