"use client";

//react-hook-form
import { Controller, useForm } from "react-hook-form";

//components
import CustomSelect from "./Select/CustomSelect";

//framer-motion
import { motion } from "framer-motion";

//constants
import {
    filterFormKeys,
    filterFormDefaultValues,
    carTypes,
    carMakes,
    carTransmissionTypes,
    carConditions,
    carFuelTypes,
    carEngineTypes,
    carDriveTypes,
    containerVariants,
} from "@/app/utilities/constants/constans";

//types
import * as filterTypes from "@/app/utilities/types/filter.types";

export default function Filter({ setFilters }: filterTypes.propTypes) {
    const {
        register,
        control,
        watch,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: filterFormDefaultValues,
        mode: "onSubmit",
    });

    const handleFilters = (data: any) => {
        const largerOrEqual = " >= ";
        const lessOrEqual = " <= ";
        const equal = " = ";
        const mapped = Object.entries(data).reduce((acc: any, [key, value]) => {
            let separator = "";
            if (key.includes("lower-bound")) {
                separator = largerOrEqual;
            } else if (key.includes("upper-bound")) {
                separator = lessOrEqual;
            } else {
                separator = equal;
            }

            if (value !== null) {
                acc.push({ key, value, separator });
            }
            return acc;
        }, []);

        setFilters(mapped);
    };

    const handleClearFilter = (e: any) => {
        e.preventDefault();
        reset();
        handleFilters({});
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-200 h-full w-full p-4 rounded-lg text-sm shadow-2xl overflow-hidden"
        >
            <form
                onSubmit={handleSubmit(handleFilters)}
                className="w-full flex flex-col gap-y-1"
            >
                <h2 className=" font-extrabold">Price:</h2>
                <div className="w-full gap-8 flex">
                    <div className="flex flex-col ">
                        <label
                            className=""
                            htmlFor={filterFormKeys.PRICE_LOWER_BOUND}
                        >
                            From($):
                        </label>
                        <input
                            {...register(filterFormKeys.PRICE_LOWER_BOUND, {
                                validate: (value) =>
                                    Number(value) >= 0 ||
                                    "The price cannot be a negative number!",
                            })}
                            type="number"
                            name={filterFormKeys.PRICE_LOWER_BOUND}
                            className="px-4 py-2 rounded-sm border-gray-400 border w-full outline-none"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label
                            className=""
                            htmlFor={filterFormKeys.PRICE_UPPER_BOUND}
                        >
                            To($):
                        </label>
                        <input
                            {...register(filterFormKeys.PRICE_UPPER_BOUND, {
                                validate: (value) => {
                                    const lowerBoundValue = Number(
                                        watch("price-lower-bound")
                                    );
                                    const upperBoundValue = Number(value);

                                    if (upperBoundValue < 0) {
                                        return "The price cannot be a negative number!";
                                    } else if (
                                        upperBoundValue < lowerBoundValue
                                    ) {
                                        return "The upper bound cannot be less than the lower bound!";
                                    }

                                    return true;
                                },
                            })}
                            type="number"
                            name={filterFormKeys.PRICE_UPPER_BOUND}
                            className="px-4 py-2 rounded-sm border-gray-400 border  w-full outline-none"
                        />
                    </div>
                </div>
                <h2 className=" font-extrabold">Make:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_MAKE}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carMakes}
                                type={"CAR_MAKE" as string}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Type:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_TYPE}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carTypes}
                                type={"CAR_TYPE"}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Transmission:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_TRANSMISSION}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carTransmissionTypes}
                                type={"CAR_TRANSMISSION"}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Condition:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_CONDITION}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carConditions}
                                type={"CAR_CONDITION"}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Fuel type:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_FUEL_TYPE}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carFuelTypes}
                                type={"CAR_FUEL_TYPE"}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Engine type:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_ENGINE_TYPE}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carEngineTypes}
                                type={"CAR_ENGINE_TYPE"}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Drive type:</h2>
                <div className="">
                    <Controller
                        control={control}
                        name={filterFormKeys.CAR_DRIVE_TYPE}
                        render={({ field }) => (
                            <CustomSelect
                                errors={errors}
                                collection={carDriveTypes}
                                type={"CAR_DRIVE_TYPE"}
                                field={field}
                            />
                        )}
                    />
                </div>
                <h2 className=" font-extrabold">Kilometers:</h2>
                <div className="w-full gap-8 flex">
                    <div className="flex flex-col ">
                        <label
                            className=""
                            htmlFor={filterFormKeys.KM_LOWER_BOUND}
                        >
                            From(km):
                        </label>
                        <input
                            {...register(filterFormKeys.KM_LOWER_BOUND, {
                                validate: (value) =>
                                    Number(value) >= 0 ||
                                    "The kilometers cannot be a negative number!",
                            })}
                            type="number"
                            name={filterFormKeys.KM_LOWER_BOUND}
                            className="px-4 py-2 rounded-sm border-gray-400 border  w-full outline-none"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label
                            className=""
                            htmlFor={filterFormKeys.KM_UPPER_BOUND}
                        >
                            To(km):
                        </label>
                        <input
                            {...register(filterFormKeys.KM_UPPER_BOUND, {
                                validate: (value) => {
                                    const lowerBoundValue = Number(
                                        watch("km-lower-bound")
                                    );
                                    const upperBoundValue = Number(value);

                                    if (upperBoundValue < 0) {
                                        return "The kilometers cannot be a negative number!";
                                    } else if (
                                        upperBoundValue < lowerBoundValue
                                    ) {
                                        return "The upper bound cannot be less than the lower bound!";
                                    }

                                    return true;
                                },
                            })}
                            type="number"
                            name={filterFormKeys.KM_UPPER_BOUND}
                            className="px-4 py-2 rounded-sm border-gray-400 border  w-full outline-none"
                        />
                    </div>
                </div>
                <h2 className=" font-extrabold">Horsepower:</h2>
                <div className="w-full gap-8 flex">
                    <div className="flex flex-col ">
                        <label
                            className=""
                            htmlFor={filterFormKeys.HORSEPOWER_LOWER_BOUND}
                        >
                            From(HP):
                        </label>
                        <input
                            {...register(
                                filterFormKeys.HORSEPOWER_LOWER_BOUND,
                                {
                                    validate: (value) =>
                                        Number(value) >= 0 ||
                                        "The horsepower cannot be a negative number!",
                                }
                            )}
                            type="number"
                            name={filterFormKeys.HORSEPOWER_LOWER_BOUND}
                            className="px-4 py-2 rounded-sm border-gray-400 border  w-full outline-none"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label
                            className=""
                            htmlFor={filterFormKeys.HORSEPOWER_UPPER_BOUND}
                        >
                            To(HP):
                        </label>
                        <input
                            {...register(
                                filterFormKeys.HORSEPOWER_UPPER_BOUND,
                                {
                                    validate: (value) => {
                                        const lowerBoundValue = Number(
                                            watch("horsepower-lower-bound")
                                        );
                                        const upperBoundValue = Number(value);

                                        if (upperBoundValue < 0) {
                                            return "The horsepower cannot be a negative number!";
                                        } else if (
                                            upperBoundValue < lowerBoundValue
                                        ) {
                                            return "The upper bound cannot be less than the lower bound!";
                                        }

                                        return true;
                                    },
                                }
                            )}
                            type="number"
                            name={filterFormKeys.HORSEPOWER_UPPER_BOUND}
                            className="px-4 py-2 rounded-sm border-gray-400 border  w-full outline-none"
                        />
                    </div>
                </div>
                <div className="flex gap-x-8 text-lg mt-4">
                    <button className="p-1 w-[45%] bg-accent-default rounded-sm hover:bg-accent-hover text-white">
                        Filter
                    </button>
                    <button
                        onClick={(e) => handleClearFilter(e)}
                        className="p-1 w-[45%] bg-green-400 rounded-sm hover:bg-green-500 text-white"
                    >
                        Clear Filter
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
