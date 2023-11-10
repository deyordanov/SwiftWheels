"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import ContactForm from "./ContactForm/ContactForm";
import MakeOffer from "./MakeOffer/MakeOffer";
import FinanceCalculator from "./FinanceCalculator/FinanceCalculator";
import PriceBreakdown from "./PriceBreakdown/PriceBreakdown";

export default function OfferModal({ car, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("contact");

    const carPrice = Number(car.price.replace("$", "").replace(".", ""));

    if (!isOpen) {
        return null;
    }

    let [isOpenDialog, setIsOpen] = useState(true);

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
                                            <ul className="flex cursor-pointer">
                                                <li
                                                    className={`px-4 py-2 ${
                                                        activeTab === "contact"
                                                            ? "text-blue-500 border-b-2 font-medium"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab("contact")
                                                    }
                                                    aria-hidden
                                                >
                                                    Contact Seller
                                                </li>
                                                <li
                                                    className={`px-4 py-2 ${
                                                        activeTab === "offer"
                                                            ? "text-blue-500 border-b-2 font-medium"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab("offer")
                                                    }
                                                    aria-hidden
                                                >
                                                    Make an Offer
                                                </li>
                                                <li
                                                    className={`px-4 py-2 ${
                                                        activeTab === "finance"
                                                            ? "text-blue-500 border-b-2 font-medium"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab("finance")
                                                    }
                                                    aria-hidden
                                                >
                                                    Finance Options
                                                </li>
                                                <li
                                                    className={`px-4 py-2 ${
                                                        activeTab === "price"
                                                            ? "text-blue-500 border-b-2 font-medium"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab("price")
                                                    }
                                                    aria-hidden
                                                >
                                                    Price Breakdown
                                                </li>
                                            </ul>
                                            <div
                                                className="cursor-pointer"
                                                onClick={onClose}
                                                aria-hidden
                                            >
                                                <svg
                                                    className="fill-current text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path d="M12.45 11.29L11.29 12.45 9 10.16 6.71 12.45 5.55 11.29 7.84 9 5.55 6.71 6.71 5.55 9 7.84 11.29 5.55 12.45 6.71 10.16 9z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="p-4 flex justify-center">
                                            {activeTab === "contact" && (
                                                <ContactForm />
                                            )}
                                            {activeTab === "offer" && (
                                                <MakeOffer
                                                    carPrice={carPrice}
                                                    onOfferSubmit={() => {}}
                                                />
                                            )}
                                            {activeTab === "finance" && (
                                                <FinanceCalculator />
                                            )}
                                            {activeTab === "price" && (
                                                <PriceBreakdown
                                                    basePrice={148000}
                                                    additionalCosts={[
                                                        {
                                                            label: "Tax",
                                                            amount: 5000,
                                                        },
                                                        {
                                                            label: "Registration",
                                                            amount: 200,
                                                        },
                                                        {
                                                            label: "Dealer Fees",
                                                            amount: 350,
                                                        },
                                                    ]}
                                                />
                                            )}
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
