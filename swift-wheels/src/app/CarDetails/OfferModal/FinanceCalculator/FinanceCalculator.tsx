"use client";

//hooks
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//components
import FormErrorMessage from "@/app/Components/shared/FormErrorMessage";

//react-icons
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

//constants
import {
    FinanceCalculatorKeys,
    FinanceCalculatorDefaultValues,
} from "@/app/utilities/constants/constans";

//types
import * as financeCalculatorTypes from "../../../utilities/types/financeCalculator.types";

export default function FinanceCalculator({
    carPrice,
    setTabs,
    offer,
}: financeCalculatorTypes.propTypes) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: FinanceCalculatorDefaultValues,
        mode: "onSubmit",
    });
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [annualInterestRate, setAnnualInterestRate] = useState(0);

    useEffect(() => {
        //Based on research it averages around 2.4%-9.6%
        setAnnualInterestRate(Math.random() * (9.6 - 2.4) + 2.4);
    }, []);

    const calculateMonthlyPayment = (data: any) => {
        const principal = offer - Number(data["down-payment"]);
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const numberOfPayments = Number(data["loan-term"]) * 12;

        // Monthly payment calculation using the formula for an amortized loan
        const monthlyPayment =
            (principal *
                (monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        return monthlyPayment.toFixed(2);
    };

    const handleReturn = () => {
        setTabs((state) => state.slice(0, -1));
    };

    const handleNext = () => {
        setTabs((state) => [...state, "price"]);
    };

    const onSubmit = (data: any) => {
        const calculatedPayment = calculateMonthlyPayment(data);
        setMonthlyPayment(calculatedPayment);
    };

    return (
        <div className="relative p-4 w-full mx-auto flex justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-4 max-w-[60%] text-primary"
            >
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor={FinanceCalculatorKeys.OFFER}>
                        Your Offer ($):
                    </label>
                    <input
                        defaultValue={carPrice}
                        type="number"
                        name={FinanceCalculatorKeys.OFFER}
                        disabled
                        className={`text-md h-[40px] px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none`}
                    />
                </div>

                <div>
                    <label htmlFor="downPayment">Down Payment ($):</label>
                    <input
                        {...register(FinanceCalculatorKeys["DOWN-PAYMENT"], {
                            required: "This field is required!",
                            validate: (value) =>
                                Number(value) >= 0 ||
                                "The down payment cannot be a negative number!",
                            max: {
                                message:
                                    "The down payment cannot be larger than the offer!",
                                value: offer,
                            },
                        })}
                        type="number"
                        name={FinanceCalculatorKeys["DOWN-PAYMENT"]}
                        id={FinanceCalculatorKeys["DOWN-PAYMENT"]}
                        className={`text-md h-[40px] px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none ${
                            errors[FinanceCalculatorKeys["DOWN-PAYMENT"]]
                                ? "border-red-500"
                                : "border-slate-500"
                        }`}
                    />
                    <FormErrorMessage
                        errors={errors}
                        fieldKey={FinanceCalculatorKeys["DOWN-PAYMENT"]}
                    />
                </div>

                <div>
                    <label htmlFor={FinanceCalculatorKeys["INTEREST-RATE"]}>
                        Annual Interest Rate (%):
                    </label>
                    <input
                        type="number"
                        name={FinanceCalculatorKeys["INTEREST-RATE"]}
                        disabled
                        value={annualInterestRate.toFixed(2)}
                        className={`text-md h-[40px] px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none`}
                    />
                </div>

                <div>
                    <label htmlFor={FinanceCalculatorKeys["LOAN-TERM"]}>
                        Loan Term (years):
                    </label>
                    <input
                        {...register(FinanceCalculatorKeys["LOAN-TERM"], {
                            required: "This field is required!",
                            validate: (value) =>
                                Number(value) >= 0 ||
                                "The loan term cannot be a negative number!",
                            max: {
                                message: "The maximum loan term is 5 years!",
                                value: 5,
                            },
                        })}
                        type="number"
                        name={FinanceCalculatorKeys["LOAN-TERM"]}
                        className={`text-md h-[40px] px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none ${
                            errors[FinanceCalculatorKeys["LOAN-TERM"]]
                                ? "border-red-500"
                                : "border-slate-500"
                        }`}
                    />
                    <FormErrorMessage
                        errors={errors}
                        fieldKey={FinanceCalculatorKeys["LOAN-TERM"]}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-300"
                >
                    Calculate
                </button>

                {monthlyPayment && (
                    <div className="flex justify-between py-2 font-semibold text-lg pt-4">
                        <span>Estimated Monthly Payment</span>
                        <span>${monthlyPayment}</span>
                    </div>
                )}
            </form>
            <button
                onClick={handleReturn}
                className="absolute -bottom-2 -left-2 text-4xl px-4 py-2"
            >
                <BsFillArrowLeftCircleFill className="text-gray-300 hover:text-gray-500" />
            </button>
            <button
                onClick={handleNext}
                className="absolute -bottom-2 -right-2 text-4xl px-4 py-2"
            >
                <BsFillArrowRightCircleFill className="text-gray-300 hover:text-gray-500" />
            </button>
        </div>
    );
}
