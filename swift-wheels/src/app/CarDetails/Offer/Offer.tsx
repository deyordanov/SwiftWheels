//hooks
import { useAuthContext } from "@/app/Contexts/authContext";

//types
import * as offerTypes from "../../utilities/types/offer.types";

export default function Offer({
    priceIndicator,
    setIsOfferModalOpen,
    ownerId,
}: offerTypes.propTypes) {
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

    const { userId } = useAuthContext();

    const handleOfferModal = () => {
        setIsOfferModalOpen((state) => !state);
    };

    const offer = getOffer();

    return (
        <div className="flex flex-col justify-center items-center shadow-xl border-2 border-gray-100 ml-4 rounded-lg p-4">
            <h1 className="text-4xl font-bold mb-4">
                Based on our calculations
            </h1>
            <p className="mb-6 text-xl text-gray-600">
                The current price of the vehicle is a:
            </p>
            <button
                disabled={ownerId === userId}
                onClick={handleOfferModal}
                className={`rounded-lg ${offer?.color} w-[60%] p-4 shadow-md text-2xl text-white font-semibold transition-transform duration-500 ease-in-out transform hover:scale-105`}
            >
                {offer?.text}
            </button>
        </div>
    );
}
