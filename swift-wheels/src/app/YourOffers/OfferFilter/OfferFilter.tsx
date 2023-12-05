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
        <div className="container">
            <Menu as="div" className="menuTextLeft">
                <div>
                    <Menu.Button className="menuButton">
                        <FaFilter className="iconLarge" />
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
                                    onClick={() => handleFilter(acceptedFilter)}
                                    className="menuButton"
                                >
                                    Accepted
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(declinedFilter)}
                                    className="menuButton"
                                >
                                    Declined
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(pendingFilter)}
                                    className="menuButton"
                                >
                                    Pending
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(isReadFilter)}
                                    className="menuButton"
                                >
                                    Read
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() =>
                                        handleFilter(isNotReadFilter)
                                    }
                                    className="menuButton"
                                >
                                    Unread
                                </button>
                            </Menu.Item>
                        </div>
                        <div className="menuItem">
                            <Menu.Item>
                                <button
                                    onClick={() => handleFilter(clearFilter)}
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
