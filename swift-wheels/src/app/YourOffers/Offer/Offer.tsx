"use client";

//hooks
import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/Contexts/authContext";

//services
import * as chatService from "@/services/chatService";
import * as offerService from "@/services/offerService";

//components
import Chat from "../Chat/Chat";

//tanstack query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//react-icons
import { FaTrashAlt } from "react-icons/fa";
import { CiRead, CiUnread } from "react-icons/ci";

//next-image
import Image from "next/image";

//next-link
import Link from "next/link";

//constants
import {
    Accepted,
    Declined,
    Pending,
} from "@/app/utilities/constants/constans";

//types
import * as offerTypes from "@/app/utilities/types/yourOffersOffer.types";

//shared
import {
    formatPrice,
    convertTimestampToEuropeanFormat,
} from "@/app/utilities/shared/shared";

export default function Offer({ offer }: offerTypes.propTypes) {
    const queryClient = useQueryClient();
    const { userId, userEmail } = useAuthContext();
    const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
    const [isChatCreated, setIsChatCreated] = useState<any>(false);
    const [chat, setChat] = useState<any>({});

    const getChatQuery = useQuery({
        queryKey: ["chats", userId, offer.carId],
        queryFn: () => chatService.getAllFilter(userId, offer.car._id),
    });

    const isValidData =
        getChatQuery.data && Object.values(getChatQuery.data).length !== 0;

    const chatCreationMutation = useMutation({
        mutationFn: () =>
            chatService.create({
                receiverId:
                    userId === offer.buyerId ? offer.sellerId : offer.buyerId,
                senderId: userId,
                messages: [
                    { message: offer.buyerMessage, senderId: offer.buyerId },
                ],
                sellerId: offer.sellerId,
                sellerEmail: userEmail,
                buyerEmail: offer.buyerEmail,
                carId: offer.car._id,
            }),
        onSuccess: (data) => {
            setChat(data);
            changeIsReadMutation.mutate();
        },
        onError: (error) => {
            console.log("Error creating chat in Offer.tsx:", error);
        },
    });

    const offerDeletionMutation = useMutation({
        mutationFn: () => offerService.remove(offer._id),
        onError: (error) => {
            console.log("Error deleting offer in Offer.tsx:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["offers"],
                exact: false,
            });
        },
    });

    const changeOfferStatusMutation = useMutation({
        mutationFn: (newOffer: string) =>
            offerService.changeStatus(offer, newOffer),
        onError: (error) => {
            console.log(
                "Error changing the status of an offer in Offer.tsx:",
                error
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["offers"],
                exact: false,
            });
        },
    });

    const changeIsReadMutation = useMutation({
        mutationFn: () => offerService.changeIsRead(offer),
        onError: (error) => {
            console.log(
                "Error chaning the isRead property on the offer in Offer.tsx:",
                error
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["offers"],
                exact: false,
            });
        },
    });

    useEffect(() => {
        if (isValidData) {
            setIsChatCreated(true);
        } else if (getChatQuery.isError) {
            console.log("Error loading chat in Offer.tsx:", getChatQuery.error);
        }
    }, [offer, userId, getChatQuery, isValidData]);

    const handleChatCreation = async () => {
        if (!isChatCreated) {
            chatCreationMutation.mutate();
        } else if (Object.values(chat).length === 0 && getChatQuery.data) {
            const existingChat = getChatQuery.data[0];

            setChat(existingChat);
            changeIsReadMutation.mutate();
        }

        setIsChatCreated(true);
        handleIsChatModalOpen();
    };

    const handleOfferDeletion = async () => {
        offerDeletionMutation.mutate();
    };

    const handleIsChatModalOpen = () => {
        setIsChatModalOpen((state) => !state);
    };

    const getOfferStatusStyle = () => {
        if (offer.offerStatus === Pending) {
            return "text-orange-400 bg-orange-100";
        } else if (offer.offerStatus === "Declined") {
            return "text-red-400 bg-red-100";
        } else {
            return "text-green-400 bg-green-100";
        }
    };

    const acceptOffer = () => {
        changeOfferStatusMutation.mutate(Accepted);
    };

    const declineOffer = () => {
        changeOfferStatusMutation.mutate(Declined);
    };

    const isOfferPending = offer.offerStatus === Pending;

    const isOfferAccepted = offer.offerStatus === Accepted;

    const isOfferDeclined = offer.offerStatus == Declined;

    const isBuyer = userId === offer._ownerId;

    const isChatValid = Object.values(chat).length !== 0;

    return (
        <li className="w-full flex flex-col justify-center items-center">
            <div
                key={offer.car._id}
                className="flex shadow-lg w-full max-w-[1400px] gap-4 rounded-lg h-full"
            >
                <div className="relative w-[35%]">
                    <Link href={`/CarDetails/${offer.car._id}`}>
                        <Image
                            src={offer.car["car-images"][1].url}
                            alt={`${offer.car["car-model"]} image`}
                            fill
                            className="object-cover  rounded-tl-lg rounded-bl-lg"
                        />
                    </Link>
                </div>
                <div className="relative flex flex-col justify-between py-4 pl-2 pr-8 gap-2 w-full">
                    <div className="flex items-center gap-2 relative">
                        <h1 className="text-xl font-bold">
                            {offer.car["car-model"]}
                        </h1>
                        -
                        <p className="text-secondary text-xl">
                            {convertTimestampToEuropeanFormat(offer._createdOn)}
                        </p>
                        -
                        <p className="text-secondary flex-1 text-xl">
                            {offer.buyerEmail}
                        </p>
                        <div className="absolute right-0 text-3xl">
                            {offer.isRead ? <CiRead /> : <CiUnread />}
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold ">
                        {formatPrice(offer.offerPrice)}
                    </h2>
                    <div className="flex gap-3 h-full items-center font-bold text-lg w-full justify-end relative">
                        <p
                            className={`${getOfferStatusStyle()} absolute rounded-lg ml-2 font-bold px-2 -left-2 text-xl`}
                        >
                            {offer.offerStatus}
                        </p>
                        {!isBuyer && !isOfferAccepted && !isOfferDeclined && (
                            <>
                                <button
                                    disabled={!isOfferPending}
                                    onClick={acceptOffer}
                                    className="px-2 py-1 text-white bg-green-400 hover:bg-green-600 rounded-lg"
                                >
                                    Accept
                                </button>
                                <button
                                    disabled={!isOfferPending}
                                    onClick={declineOffer}
                                    className="px-2 py-1 text-white bg-red-400 hover:bg-red-600 rounded-lg"
                                >
                                    Decline
                                </button>
                            </>
                        )}
                        <button
                            disabled={isOfferDeclined}
                            onClick={handleChatCreation}
                            className="px-2 py-1 text-white bg-blue-400 hover:bg-blue-600 rounded-lg"
                        >
                            Message {isBuyer ? "Buyer" : "Seller"}
                        </button>
                        <button
                            onClick={handleOfferDeletion}
                            className="text-xl hover:opacity-70"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            </div>
            {isChatCreated && isChatValid && (
                <Chat
                    setIsChatModalOpen={setIsChatModalOpen}
                    isChatModalOpen={isChatModalOpen}
                    chat={chat}
                />
            )}
        </li>
    );
}
