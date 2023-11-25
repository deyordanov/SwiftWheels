"use client";

//services
import * as offerService from "@/services/offerService";
// import * as chatService from "@/services/chatService";

//types
import React, { useEffect, useState } from "react";

import { useAuthContext } from "../Contexts/authContext";
// import {
//     formatPrice,
//     convertTimestampToCustomFormat,
// } from "../utilities/shared/shared";
// import Chat from "./Chat/Chat";
import Offer from "./Offer/Offer";

export default function Page() {
    const [offers, setOffers] = useState([]);

    // const [isChatCreated, setIsChatCreated] = useState<any>(false);
    // const [chat, setChat] = useState<any>({});
    const { userId } = useAuthContext();

    // useEffect(() => {
    //     const getChatForCurrentUser = async () => {
    //         const a = await chatService.getAllFilter(userId);
    //         setIsChatCreated(a.length !== 0);
    //     };

    //     getChatForCurrentUser();
    // });

    // const handleChatCreation = async (offerData: any) => {
    //     if (!isChatCreated) {
    //         const newChat = await chatService.create({
    //             receiverId:
    //                 userId !== offerData._ownerId
    //                     ? offerData.sellerId
    //                     : offerData._ownerId,
    //             senderId: userId,
    //             messages: [offerData.message],
    //             sellerId: offerData.sellerId,
    //         });

    //         setChat(newChat);
    //     } else if (Object.values(chat).length === 0) {
    //         const existingChat = await chatService.getAllFilter(userId);

    //         setChat(existingChat[0]);
    //     }

    //     setIsChatCreated(true);
    //     handleIsChatModalOpen((state) => !state);
    // };

    useEffect(() => {
        const handleOffers = async () => {
            setOffers(await offerService.getAllFilter(userId));
        };

        handleOffers();
    }, [userId]);

    // const handleIsChatModalOpen = () => {
    //     setIsChatModalOpen((state) => !state);
    // };

    return (
        <section className="container flex items-center justify-center h-screen w-screen mx-auto mt-2 text-primary font-semibold">
            <ul className="flex flex-col h-full">
                {offers?.map((offer: any) => (
                    <Offer key={offer._id} offer={offer} />
                ))}
            </ul>
        </section>
    );
}
