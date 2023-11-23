"use client";

//react-select
import makeAnimated from "react-select/animated";
import Select from "react-select";

//react-hook-form
import { Controller, useForm } from "react-hook-form";

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
    customStyles,
} from "@/app/utilities/constants/constans";

//shared
import { getSelectControlType } from "@/app/utilities/shared/shared";

import { motion } from "framer-motion";

export default function Filter({ setFilters }) {
    const animatedComponents = makeAnimated();

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
        const mapped = Object.entries(data).reduce((acc: any, [key, value]) => {
            let separator = "";
            if (key.includes("lower-bound")) {
                separator = " >= ";
            } else if (key.includes("upper-bound")) {
                separator = " <= ";
            } else {
                separator = "=";
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
    const containerVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1, transition: { duration: 2 } },
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null ? option.value : null
                                    )
                                }
                                value={
                                    carMakes.find(
                                        (c) =>
                                            (c.value as string | number) ===
                                            field.value
                                    ) || null
                                }
                                isMulti={false}
                                components={animatedComponents}
                                options={carMakes as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_MAKE,
                                            base
                                        ),
                                }}
                                placeholder="Car make....."
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null ? option.value : null
                                    )
                                }
                                value={carTypes.find(
                                    (c) =>
                                        (c.value as string | number) ===
                                        field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carTypes as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_TYPE,
                                            base
                                        ),
                                }}
                                placeholder="Car type....."
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null ? option.value : null
                                    )
                                }
                                value={carTransmissionTypes.find(
                                    (c) =>
                                        (c.value as string | number) ===
                                        field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carTransmissionTypes as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_TRANSMISSION,
                                            base
                                        ),
                                }}
                                placeholder="Car transmission....."
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null ? option.value : null
                                    )
                                }
                                value={carConditions.find(
                                    (c) =>
                                        (c.value as string | number) ===
                                        field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carConditions as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_CONDITION,
                                            base
                                        ),
                                }}
                                placeholder="Car condition....."
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null ? option.value : null
                                    )
                                }
                                value={carFuelTypes.find(
                                    (c) =>
                                        (c.value as string | number) ===
                                        field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carFuelTypes as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_FUEL_TYPE,
                                            base
                                        ),
                                }}
                                placeholder="Car fuel type....."
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null
                                            ? option !== null
                                                ? option.value
                                                : null
                                            : null
                                    )
                                }
                                value={carEngineTypes.find(
                                    (c) =>
                                        (c.value as string | number) ===
                                        field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carEngineTypes as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_ENGINE_TYPE,
                                            base
                                        ),
                                }}
                                placeholder="Car engine type....."
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
                            <Select
                                {...field}
                                onChange={(option) =>
                                    field.onChange(
                                        option !== null ? option.value : null
                                    )
                                }
                                value={carDriveTypes.find(
                                    (c) =>
                                        (c.value as string | number) ===
                                        field.value
                                )}
                                isMulti={false}
                                components={animatedComponents}
                                options={carDriveTypes as any}
                                className="w-full"
                                styles={{
                                    ...customStyles,
                                    control: (base) =>
                                        getSelectControlType(
                                            errors,
                                            filterFormKeys.CAR_DRIVE_TYPE,
                                            base
                                        ),
                                }}
                                placeholder="Car drive type....."
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
