"use state";

//headless-ui
import { Menu, Transition } from "@headlessui/react";

//react-icons
import { FaFilter } from "react-icons/fa";

//constants
import {
    acceptedFilter,
    declinedFilter,
    pendingFilter,
    isReadFilter,
    isNotReadFilter,
    clearFilter,
} from "@/app/utilities/constants/constans";

//types
import * as offerFilterTypes from "@/app/utilities/types/yourOffersOfferFilter.types";
import { Fragment } from "react";
import * as React from "react";

export default function OfferFilter({ setFilter }: offerFilterTypes.propTypes) {
    const handleFilter = async (filter: string) => {
        setFilter(filter);
    };

    return (
        <div className="text-right cursor-pointer">
            <Menu as="div" className="text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center px-4 py-2 text-sm font-medium ">
                        <FaFilter className="text-3xl" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="text-center absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(acceptedFilter)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Accepted
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(declinedFilter)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Declined
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(pendingFilter)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Pending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(isReadFilter)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Read
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() =>
                                        handleFilter(isNotReadFilter)
                                    }
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Unread
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(clearFilter)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold text-green-400"
                                >
                                    Clear Filter
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
