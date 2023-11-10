"use client";

//hooks
import React, { useState } from "react";
import { useForm } from "react-hook-form";

//components
import FormErrorMessage from "@/app/Components/shared/FormErrorMessage";

//constants
import {
    MakeOfferFormKeys,
    MakeOfferFormDefaultValues,
} from "@/app/utilities/constants/constans";

export default function MakeOffer({ carPrice }: { carPrice: number }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: MakeOfferFormDefaultValues,
        mode: "onSubmit",
    });

    const [offer, setOffer] = useState("");

    const onSubmit = (data) => {
        console.log(data);
    };

    function formatPrice(price: number) {
        return `${price.toLocaleString("en-US")}$`;
    }

    return (
        <div className="p-4 max-w-md mx-auto text-md">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
            >
                <div className="flex flex-col gap-y-4">
                    <div>
                        <label
                            htmlFor={MakeOfferFormKeys.OFFER}
                            className="block text-xl font-semibold mb-4"
                        >
                            Your Offer ($):
                        </label>
                        <input
                            {...register(MakeOfferFormKeys.OFFER, {
                                min: {
                                    message: `The offer should be greater than or equal to ${formatPrice(
                                        carPrice * 0.2
                                    )}`,
                                    value: carPrice * 0.2,
                                },
                            })}
                            type="number"
                            name={MakeOfferFormKeys.OFFER}
                            value={offer}
                            onChange={(e) => setOffer(e.target.value)}
                            required
                            className="p-2 border rounded-lg outline-none"
                            placeholder="Enter your offer"
                        />
                    </div>
                    <FormErrorMessage
                        errors={errors}
                        fieldKey={MakeOfferFormKeys.OFFER}
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
                Car Price: <strong>{formatPrice(carPrice)}</strong>
            </p>
        </div>
    );
}
