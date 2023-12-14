//hooks
import { useAuthContext } from "@/app/Contexts/authContext/authContext";

//material-tailwind
import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";

//types
import * as offerTypes from "../../utilities/types/offer.types";
import React from "react";

export default function Offer({
    priceIndicator,
    setIsOfferModalOpen,
    ownerId,
}: offerTypes.propTypes) {
    const [openPopover, setOpenPopover] = React.useState(false);
    const offer = getOffer();
    const { userId } = useAuthContext();

    const handleOfferModal = () => {
        setIsOfferModalOpen((state) => !state);
    };

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    function getOffer() {
        if (priceIndicator <= 0.2) {
            return { text: "Excellent Offer", color: "bg-green-500" };
        } else if (priceIndicator <= 0.4) {
            return { text: "Good Offer", color: "bg-green-400" };
        } else if (priceIndicator <= 0.6) {
            return { text: "Average Offer", color: "bg-yellow-500" };
        } else if (priceIndicator <= 0.8) {
            return { text: "Bad Offer", color: "bg-orange-500" };
        } else if (priceIndicator <= 1) {
            return { text: "Poor Offer", color: "bg-red-500" };
        }
    }

    return (
        <div className="flex flex-col justify-center items-center shadow-xl border-2 border-gray-100 ml-4 rounded-lg p-4">
            <h1 className="text-4xl font-bold mb-4">
                Based on our calculations
            </h1>
            <p className="mb-6 text-xl text-gray-600">
                The current price of the vehicle is a:
            </p>
            {ownerId === userId ? (
                <Popover open={openPopover} handler={setOpenPopover}>
                    <PopoverHandler {...triggers}>
                        <button
                            onClick={handleOfferModal}
                            className={`rounded-lg ${offer?.color} w-[60%] p-4 shadow-md text-2xl text-white font-semibold transition-transform duration-500 ease-in-out transform hover:scale-105`}
                        >
                            {offer?.text}
                        </button>
                    </PopoverHandler>
                    <PopoverContent
                        {...triggers}
                        className="z-50 max-w-[26rem] shadow-xl"
                    >
                        <p className="text-xl text-center">
                            You cannot make an offer as you are the{" "}
                            <span className="font-extrabold">creator</span> of
                            the offer!
                        </p>
                    </PopoverContent>
                </Popover>
            ) : (
                <button
                    onClick={handleOfferModal}
                    className={`rounded-lg ${offer?.color} w-[60%] p-4 shadow-md text-2xl text-white font-semibold transition-transform duration-500 ease-in-out transform hover:scale-105`}
                >
                    {offer?.text}
                </button>
            )}
        </div>
    );
}
