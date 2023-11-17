"use client";

//hooks
import { useState } from "react";

//react-slider
import ReactSlider from "react-slider";

//react-hook-form
import { Controller, useForm } from "react-hook-form";

//constants
import { filterFormKeys, filterFormDefaultValues } from "@/app/utilities/constants/constans";

export default function Filter() {
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(10000);

    const handleLowerBound = (value: number) => {
        setLowerBound(value);
    };

    const handleUpperBound = (value: number) => {
        setUpperBound(value);
    };

    function formatPrice(price: number) {
        return `${price.toLocaleString("en-US")}$`;
    }

    const {
        register,
        control,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: filterFormDefaultValues,
        mode: "onSubmit",
    });

    return (
        <aside className="bg-blue-gray-300 h-full w-[30%] p-4 text-primary">
            <div className="w-full flex flex-col gap-y-4">
                <h2 className="text-xl font-semibold">Pirce Range:</h2>
                <div className="w-full gap-8 flex">
                    <Controller 
                        control={control}
                        name={filterFormKeys.}

                    render={({ field }) => (
                        <ReactSlider
                        {...field}
                        onChange={(value) => handleLowerBound(value)}
                        className="h-2 w-[50%] flex items-center z-0"
                        thumbClassName="h-6 w-6 rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none"
                        trackClassName="h-2 bg-gray-200"
                        min={0}
                        max={1000000}
                        step={100}
                    />
                    )}
                    />
                    <ReactSlider
                        onChange={(value) => handleUpperBound(value)}
                        className="h-2 w-[50%] flex items-center z-0"
                        thumbClassName="h-6 w-6 rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none"
                        trackClassName="h-2 bg-gray-200"
                        min={10000}
                        max={1000000}
                        step={100}
                    />
                </div>
                <div className="w-full gap-4 flex">
                    <input
                        type="text"
                        disabled
                        value={formatPrice(lowerBound)}
                        className="px-4 py-2 rounded-lg text-lg w-full"
                    />
                    <input
                        type="text"
                        disabled
                        value={formatPrice(upperBound)}
                        className="px-4 py-2 rounded-lg text-lg w-full"
                    />
                </div>
            </div>
        </aside>
    );
}
