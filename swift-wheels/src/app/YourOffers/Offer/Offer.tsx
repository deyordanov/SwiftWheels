"use client";

//hooks
import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/Contexts/authContext";

//components
import Chat from "../Chat/Chat";

//tanstack query
import { useQuery, useMutation } from "@tanstack/react-query";

//react-icons
import { FaTrashAlt } from "react-icons/fa";

//shared
import {
    formatPrice,
    convertTimestampToCustomFormat,
} from "@/app/utilities/shared/shared";

//services
import * as chatService from "@/services/chatService";
import * as offerService from "@/services/offerService";

export default function Offer({ offer }) {
    const { userId, userEmail } = useAuthContext();
    const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
    const [isChatCreated, setIsChatCreated] = useState<any>(false);
    const [offerStatus, setOfferStatus] = useState<String>("Pending");
    const [chat, setChat] = useState<any>({});

    const getChatQuery = useQuery({
        queryKey: ["chats", userId, offer.carId],
        queryFn: () => chatService.getAllFilter(userId, offer.carId),
    });

    const chatCreationMutation = useMutation({
        mutationFn: () =>
            chatService.create({
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
            }),
        onSuccess: (data) => {
            setChat(data);
        },
        onError: (error) => {
            console.log("Error creating chat in Offer.tsx", error);
        },
    });

    const offerDeletionMutation = useMutation({
        mutationFn: (offerId: string) => offerService.remove(offerId),
        onError: (error) => {
            console.log("Error delting offer in Offer.tsx", error);
        },
    });

    useEffect(() => {
        if (getChatQuery.data) {
            setIsChatCreated(getChatQuery.data);
        } else if (getChatQuery.isError) {
            console.log("Error loading chat in Offer.tsx:", getChatQuery.error);
        }
    }, [offer, userId, getChatQuery]);

    const handleChatCreation = async () => {
        if (!isChatCreated) {
            await chatCreationMutation.mutateAsync();
        } else if (Object.values(chat).length === 0 && getChatQuery.data) {
            const existingChat = getChatQuery.data[0];

            setChat(existingChat);
        }

        setIsChatCreated(true);
        handleIsChatModalOpen();
    };

    const handleOfferDeletion = async (offerId: string) => {
        offerDeletionMutation.mutate(offerId);
    };

    const handleIsChatModalOpen = () => {
        setIsChatModalOpen((state) => !state);
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
            <div className="w-[12%] h-full flex items-center">
                <p
                    className={`${getOfferStatusStyle()} w-full rounded-lg ml-2`}
                >
                    {offerStatus}
                </p>
                <button className="pl-4 text-xl hover:text-gray-300">
                    <FaTrashAlt />
                </button>
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
