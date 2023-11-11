export default function Offer({ priceIndicator }: { priceIndicator: number }) {
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
                className={`rounded-lg ${offer?.color} w-[60%] p-4 shadow-md text-2xl text-white font-semibold transition-transform duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-opacity-50`}
            >
                {offer?.text}
            </button>
        </div>
    );
}
