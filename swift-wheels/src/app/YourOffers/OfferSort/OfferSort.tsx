"use state";

import { Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import * as offerService from "@/services/offerService";

export default function OfferSort({ setSort }) {
    const handleSort = async (sort: string) => {
        setSort(sort);
    };

    const priceDescSort = `offerPrice desc`;
    const priceAscSort = `offerPrice`;
    const offerStatusDescSort = "offerStatus desc";
    const offerStatusAscSort = "offerStatus";
    const dateDescSort = `_createdOn desc`;
    const dateAscSort = `_createdOn`;
    const clearSort = "";

    return (
        <div className="text-right cursor-pointer">
            <Menu as="div" className="text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center px-4 py-2 text-sm font-medium ">
                        <FaSortAmountDown className="text-3xl" />
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
                                    onClick={() => handleSort(priceAscSort)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Price Ascending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(priceDescSort)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Price Descending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <button
                                    onClick={() =>
                                        handleSort(offerStatusAscSort)
                                    }
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Offer Status Ascending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <button
                                    onClick={() =>
                                        handleSort(offerStatusDescSort)
                                    }
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Offer Status Descending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(dateAscSort)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Date Ascending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(dateDescSort)}
                                    className="hover:bg-gray-100 w-full py-1 font-semibold"
                                >
                                    Date Descending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(clearSort)}
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
