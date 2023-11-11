"use client";

//hooks
import React from "react";
import { useForm } from "react-hook-form";

//components
import FormErrorMessage from "@/app/Components/shared/FormErrorMessage";

//constants
import {
    MakeOfferFormKeys,
    MakeOfferFormDefaultValues,
} from "@/app/utilities/constants/constans";

//types
import * as makeOfferTypes from "../../../utilities/types/makeOffer.types";

export default function MakeOffer({
    carPrice,
    setOffer,
    setTabs,
}: makeOfferTypes.propTypes) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: MakeOfferFormDefaultValues,
        mode: "onSubmit",
    });

    const onSubmit = (data: any) => {
        setOffer(Number(data.offer));
        setTabs((state) => [...state, "finance"]);
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
                                //There cannot be offers that go below 80% of the car's price
                                min: {
                                    message: `The offer should be greater than or equal to ${formatPrice(
                                        carPrice * 0.8
                                    )}`,
                                    value: carPrice * 0.8,
                                },
                                //There cannot be offers which are more than 10% above the car's price
                                max: {
                                    message: `The offer should be lower or equal to ${formatPrice(
                                        carPrice * 1.1
                                    )}`,
                                    value: carPrice * 1.1,
                                },
                            })}
                            type="number"
                            name={MakeOfferFormKeys.OFFER}
                            className="p-2 border rounded-lg outline-none"
                            placeholder="Enter your offer"
                        />
                    </div>
                    <FormErrorMessage
                        errors={errors}
                        fieldKey={MakeOfferFormKeys.OFFER}
                    />
                </div>

                <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-300">
                    Submit Offer
                </button>
            </form>

            <p className="mt-4 text-sm">
                Car Price: <strong>{formatPrice(carPrice)}</strong>
            </p>
        </div>
    );
}
