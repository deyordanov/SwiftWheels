"use client";

//headless-ui
import { Menu, Transition } from "@headlessui/react";

//react-icons
import { FaSortAmountDown } from "react-icons/fa";

//constants
import {
    priceDescSort,
    priceAscSort,
    offerStatusDescSort,
    offerStatusAscSort,
    dateDescSort,
    dateAscSort,
    clearSort,
} from "@/app/utilities/constants/constans";

//types
import * as OfferSortTypes from "@/app/utilities/types/yourOffersOfferSort.types";
import { Fragment } from "react";
import * as React from "react";

//styles
import "./OfferSort.css";

export default function OfferSort({ setSort }: OfferSortTypes.propTypes) {
    const handleSort = async (sort: string) => {
        setSort(sort);
    };

    return (
        <div className="container">
            <Menu as="div" className="menu">
                <div>
                    <Menu.Button className="menuButton">
                        <FaSortAmountDown className="iconLarge" />
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
                    <Menu.Items className="menuItems">
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(priceAscSort)}
                                    className="menuButton"
                                >
                                    Price Ascending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(priceDescSort)}
                                    className="menuButton"
                                >
                                    Price Descending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() =>
                                        handleSort(offerStatusAscSort)
                                    }
                                    className="menuButton"
                                >
                                    Offer Status Ascending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() =>
                                        handleSort(offerStatusDescSort)
                                    }
                                    className="menuButton"
                                >
                                    Offer Status Descending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(dateAscSort)}
                                    className="menuButton"
                                >
                                    Date Ascending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(dateDescSort)}
                                    className="menuButton"
                                >
                                    Date Descending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleSort(clearSort)}
                                    className="menuButton clearFilterButton"
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
