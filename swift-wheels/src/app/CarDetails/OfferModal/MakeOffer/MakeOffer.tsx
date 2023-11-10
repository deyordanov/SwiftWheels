"use client";

import React, { useState } from "react";

export default function MakeOffer({ onOfferSubmit, carPrice }) {
    const [offer, setOffer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateOffer()) {
            onOfferSubmit(offer);
        } else {
            alert("Please enter a valid offer.");
        }
    };

    const validateOffer = () => {
        // Basic validation to check if the offer is a positive number and not greater than the car price
        const offerAmount = parseFloat(offer);
        return offerAmount > 0 && offerAmount <= carPrice;
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label
                        htmlFor="offer"
                        className="block text-sm font-semibold"
                    >
                        Your Offer ($):
                    </label>
                    <input
                        type="number"
                        name="offer"
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        required
                        className="p-2 border rounded w-full"
                        placeholder="Enter your offer"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-300"
                >
                    Submit Offer
                </button>
            </form>

            <p className="mt-4 text-sm">
                Car Price: <strong>${carPrice}</strong>
            </p>
        </div>
    );
}
