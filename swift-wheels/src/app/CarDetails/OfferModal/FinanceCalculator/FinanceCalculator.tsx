"use client";

import React, { useState } from "react";

export default function FinanceCalculator() {
    const [financeData, setFinanceData] = useState({
        carPrice: "",
        downPayment: "",
        interestRate: "",
        loanTerm: "",
    });

    const [monthlyPayment, setMonthlyPayment] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFinanceData((prevState) => ({
            ...prevState,
            [name]: parseFloat(value),
        }));
    };

    const calculateMonthlyPayment = () => {
        const { carPrice, downPayment, interestRate, loanTerm } = financeData;
        const principal = carPrice - downPayment;
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        // Monthly payment calculation using the formula for an amortized loan
        const monthlyPayment =
            (principal *
                (monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        return monthlyPayment.toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedPayment = calculateMonthlyPayment();
        setMonthlyPayment(calculatedPayment);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label
                        htmlFor="carPrice"
                        className="block text-sm font-semibold"
                    >
                        Car Price ($):
                    </label>
                    <input
                        type="number"
                        name="carPrice"
                        value={financeData.carPrice}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div>
                    <label
                        htmlFor="downPayment"
                        className="block text-sm font-semibold"
                    >
                        Down Payment ($):
                    </label>
                    <input
                        type="number"
                        name="downPayment"
                        value={financeData.downPayment}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div>
                    <label
                        htmlFor="interestRate"
                        className="block text-sm font-semibold"
                    >
                        Annual Interest Rate (%):
                    </label>
                    <input
                        type="number"
                        name="interestRate"
                        step="0.1"
                        value={financeData.interestRate}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div>
                    <label
                        htmlFor="loanTerm"
                        className="block text-sm font-semibold"
                    >
                        Loan Term (years):
                    </label>
                    <input
                        type="number"
                        name="loanTerm"
                        value={financeData.loanTerm}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                    Calculate
                </button>

                {monthlyPayment && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <p className="text-lg">
                            Estimated Monthly Payment:{" "}
                            <strong>${monthlyPayment}</strong>
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
