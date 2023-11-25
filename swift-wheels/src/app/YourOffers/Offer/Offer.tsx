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
    const { userId } = useAuthContext();
    const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
    const [isChatCreated, setIsChatCreated] = useState<any>(false);
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
                    { message: offer.message, senderId: offer._ownerId },
                ],
                sellerId: offer.sellerId,
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

    return (
        <li
            key={offer._id}
            className="flex items-center px-4 py-2 rounded-lg shadow-xl"
        >
            <button
                onClick={handleIsChatModalOpen}
                className=" px-2 text-lg font-extrabold hover:cursor-pointer"
            >
                {offer.carModel}
            </button>

            <div className="flex">
                <p className="text-primary border-l-2 border-gray-200 px-2">
                    {offer.name}
                </p>
                <p className="text-primary border-l-2 border-gray-200 px-2">
                    {formatPrice(offer.carPrice)}
                </p>
                <p className="text-primary border-l-2 border-gray-200 px-2">
                    {convertTimestampToCustomFormat(offer._createdOn)}
                </p>
            </div>
            <div className="flex border-l-2 border-r-2 border-gray-200 px-2 gap-2 ">
                <button className="px-2 py-1 text-white  bg-green-500 hover:bg-green-600 rounded-lg">
                    Accept
                </button>
                <button className="px-2 py-1 text-white  bg-red-500 hover:bg-red-600 rounded-lg">
                    Decline
                </button>
                {!isChatCreated ? (
                    <button
                        onClick={() => handleChatCreation()}
                        className="px-2 py-1 text-white  bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                        Begin A Chat
                    </button>
                ) : (
                    <button
                        onClick={() => handleChatCreation()}
                        className="px-2 py-1 text-white  bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                        Message Buyer
                    </button>
                )}
            </div>
            <p className="text-orange-400 bg-orange-100 rounded-lg px-2 ml-2">
                Pending
            </p>
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
