"use client";

//hooks
import { useState, useEffect } from "react";

//shared
import { useAuthContext } from "@/app/Contexts/authContext";
import {
    formatPrice,
    convertTimestampToCustomFormat,
} from "@/app/utilities/shared/shared";

//services
import * as chatService from "@/services/chatService";
import Chat from "../Chat/Chat";

export default function Offer({ offer }) {
    const { userId, userEmail } = useAuthContext();
    const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
    const [isChatCreated, setIsChatCreated] = useState<any>(false);
    const [offerStatus, setOfferStatus] = useState<String>("Pending");
    const [chat, setChat] = useState<any>({});

    useEffect(() => {
        const getChatForCurrentUser = async () => {
            const a = await chatService.getAllFilter(userId, offer.carId);
            setIsChatCreated(a.length !== 0);
        };

        getChatForCurrentUser();
    }, [offer, userId]);

    const handleIsChatModalOpen = () => {
        setIsChatModalOpen((state) => !state);
    };

    const handleChatCreation = async () => {
        console.log(offer);
        if (!isChatCreated) {
            const newChat = await chatService.create({
                receiverId:
                    userId === offer._ownerId ? offer.sellerId : offer._ownerId,
                senderId: userId,
                messages: [
                    { message: offer.buyerMessage, senderId: offer._ownerId },
                ],
                sellerId: offer.sellerId,
                sellerEmail: userEmail,
                buyerEmail: offer.buyerEmail,
                carId: offer.carId,
            });

            setChat(newChat);
        } else if (Object.values(chat).length === 0) {
            const existingChat = await chatService.getAllFilter(
                userId,
                offer.carId
            );

            setChat(existingChat[0]);
        }

        setIsChatCreated(true);
        handleIsChatModalOpen();
    };

    const getOfferStatusStyle = () => {
        if (offerStatus === "Pending") {
            return "text-orange-400 bg-orange-100";
        } else if (offerStatus === "Declined") {
            return "text-red-400 bg-red-100";
        } else {
            return "text-green-400 bg-green-100";
        }
    };

    const acceptOffer = () => {
        setOfferStatus("Accepted");
    };

    const declineOffer = () => {
        setOfferStatus("Declined");
    };

    const isOfferSet = () => offerStatus !== "Pending";

    const isOfferDeclined = offerStatus === "Declined";

    const isBuyer = userId === offer._ownerId;

    return (
        <li
            key={offer._id}
            className="flex items-center px-4 py-2 rounded-lg shadow-lg justify-between text-center divide-x-2 divide-gray-200 h-[7%]"
        >
            <h1 className="pr-2 text-lg font-extrabold">{offer.carModel}</h1>

            <div className="flex flex-1 items-center divide-x-2 divide-gray-200 h-full">
                <p className="text-primary px-2 flex-1">{offer.buyerEmail}</p>
                <p className="text-primary px-2 h-full flex items-center">
                    {formatPrice(offer.offerPrice)}
                </p>
                <p className="text-primary px-2 h-full flex items-center">
                    {convertTimestampToCustomFormat(offer._createdOn)}
                </p>
            </div>
            <div className="flex px-2 gap-2 h-full items-center">
                {!isBuyer && (
                    <>
                        <button
                            disabled={isOfferSet()}
                            onClick={acceptOffer}
                            className="px-2 py-1 text-white  bg-green-500 hover:bg-green-600 rounded-lg flex"
                        >
                            Accept
                        </button>
                        <button
                            disabled={isOfferSet()}
                            onClick={declineOffer}
                            className="px-2 py-1 text-white  bg-red-500 hover:bg-red-600 rounded-lg"
                        >
                            Decline
                        </button>
                    </>
                )}
                <button
                    disabled={isOfferDeclined}
                    onClick={handleChatCreation}
                    className="px-2 py-1 text-white  bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                    Message {isBuyer ? "Seller" : "Buyer"}
                </button>
            </div>
            <div className="w-[10%] h-full flex items-center">
                <p
                    className={`${getOfferStatusStyle()} w-full rounded-lg ml-2`}
                >
                    {offerStatus}
                </p>
            </div>
            {isChatCreated && Object.values(chat).length !== 0 && (
                <Chat
                    setIsChatModalOpen={setIsChatModalOpen}
                    isChatModalOpen={isChatModalOpen}
                    chat={chat}
                />
            )}
        </li>
    );
}
