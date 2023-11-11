"use client";

//hooks
import React, { Fragment, useState } from "react";

//components
import { Dialog, Transition } from "@headlessui/react";
import ContactForm from "./ContactForm/ContactForm";
import MakeOffer from "./MakeOffer/MakeOffer";
import FinanceCalculator from "./FinanceCalculator/FinanceCalculator";
import PriceBreakdown from "./PriceBreakdown/PriceBreakdown";

export default function OfferModal({ car, isOpen, onClose }) {
    const [tabs, setTabs] = useState(["offer"]);
    const [isOpenDialog, setIsOpen] = useState(true);
    const [offer, setOffer] = useState(0);

    const carPrice = Number(car.price.replace("$", "").replace(".", ""));

    if (!isOpen) {
        return null;
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Open dialog
                </button>
            </div>

            <Transition appear show={isOpenDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all text-black">
                                    <div className="bg-white rounded shadow-lg">
                                        <div className="border-b px-4 py-2 flex justify-between items-center">
                                            <ul className="flex gap-x-2">
                                                <li
                                                    className={`px-4 py-2  rounded-lg ${
                                                        tabs[
                                                            tabs.length - 1
                                                        ] === "offer"
                                                            ? "text-white bg-green-500"
                                                            : "bg-gray-300"
                                                    }`}
                                                    aria-hidden
                                                >
                                                    Make an Offer
                                                </li>
                                                <li
                                                    className={`px-4 py-2  rounded-lg ${
                                                        tabs[
                                                            tabs.length - 1
                                                        ] === "finance"
                                                            ? "text-white bg-green-500"
                                                            : "bg-gray-300"
                                                    }`}
                                                    aria-hidden
                                                >
                                                    Finance Options
                                                </li>
                                                <li
                                                    className={`px-4 py-2  rounded-lg ${
                                                        tabs[
                                                            tabs.length - 1
                                                        ] === "price"
                                                            ? "text-white bg-green-500"
                                                            : "bg-gray-300"
                                                    }`}
                                                    aria-hidden
                                                >
                                                    Price Breakdown
                                                </li>
                                                <li
                                                    className={`px-4 py-2  rounded-lg ${
                                                        tabs[
                                                            tabs.length - 1
                                                        ] === "contact"
                                                            ? "text-white bg-green-500"
                                                            : "bg-gray-300"
                                                    }`}
                                                    aria-hidden
                                                >
                                                    Contact Seller
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="p-4 flex justify-center">
                                            {/* PriceBreakdown before finance options -> take the total price and calculate the leasing with it? Makes more sense */}
                                            {tabs[tabs.length - 1] ===
                                                "offer" && (
                                                <MakeOffer
                                                    carPrice={carPrice}
                                                    setOffer={setOffer}
                                                    setTabs={setTabs}
                                                />
                                            )}
                                            {tabs[tabs.length - 1] ===
                                                "finance" && (
                                                <FinanceCalculator
                                                    carPrice={offer}
                                                    setTabs={setTabs}
                                                    offer={offer}
                                                />
                                            )}
                                            {tabs[tabs.length - 1] ===
                                                "price" && (
                                                <PriceBreakdown
                                                    basePrice={offer}
                                                />
                                            )}
                                            {tabs[tabs.length - 1] ===
                                                "contact" && <ContactForm />}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
// Example of using PriceBreakdown component
// <PriceBreakdown
//   basePrice={148000}
//   additionalCosts={[
//     { label: 'Tax', amount: 5000 },
//     { label: 'Registration', amount: 200 },
//     { label: 'Dealer Fees', amount: 350 }
//   ]}
// />
