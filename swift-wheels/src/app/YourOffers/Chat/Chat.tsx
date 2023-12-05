"use client";

//hooks
import React, { useEffect, useRef, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/app/Contexts/authContext";
import { useMutation } from "@tanstack/react-query";

//next-image
import Image from "next/image";

//services
import * as chatService from "@/services/chatService";

//headlessui
import { Dialog, Transition } from "@headlessui/react";

//types
import * as chatTypes from "@/app/utilities/types/chat.types";

//constants
import {
    createMessageFormKeys,
    createMessageFormDefaultValues,
} from "@/app/utilities/constants/constans";

import { Avatar } from "@material-tailwind/react";

export default function Chat({
    isChatModalOpen,
    setIsChatModalOpen,
    chat,
}: chatTypes.propTypes) {
    const messagesEndRef = useRef(null);
    const [currentChat, setCurrentChat] = useState(chat);
    const { userId } = useAuthContext();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: createMessageFormDefaultValues,
        mode: "onSubmit",
    });

    const messageCreationMutation = useMutation({
        mutationFn: (data: any) =>
            chatService.addMessageToChat(
                chat._id,
                data[createMessageFormKeys.CHAT_MESSAGE],
                userId
            ),
        onSuccess: (data) => {
            console.log("data");
            console.log(data);
            setCurrentChat(data);
            reset();
        },
        onError: (error) => {
            console.log("Error creating chat in Chat.tsx:", error);
        },
    });

    const handleMessageCreation = async (data: any) => {
        messageCreationMutation.mutate(data);
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Transition appear show={isChatModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={setIsChatModalOpen}
            >
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

                <div className="fixed inset-0">
                    <div className="flex items-center justify-center h-full">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="max-h-[80%] transform rounded-lg bg-white shadow-xl transition-all text-black w-[40%]">
                                <form
                                    onSubmit={handleSubmit(
                                        handleMessageCreation
                                    )}
                                    className="flex-1 p-2 sm:p-6 justify-between flex flex-col w-full text-primary"
                                >
                                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 mb-2">
                                        <div className="relative flex items-center space-x-4">
                                            <div className="relative">
                                                <span className="absolute text-green-500 right-0 bottom-0 z-10">
                                                    <svg width="20" height="20">
                                                        <circle
                                                            cx="8"
                                                            cy="8"
                                                            r="8"
                                                            fill="currentColor"
                                                        ></circle>
                                                    </svg>
                                                </span>
                                                <div className="relative w-10 sm:w-16 h-10 sm:h-16 rounded-full">
                                                    <Avatar
                                                        src="/images/user/avatar1.png"
                                                        alt="avatar"
                                                        size="lg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="text-2xl mt-1 flex items-center">
                                                    <span className="mr-3">
                                                        {chat.sellerId ===
                                                        userId
                                                            ? chat.buyerEmail
                                                            : chat.sellerEmail}
                                                    </span>
                                                </div>
                                                <span className="text-lg">
                                                    {chat.sellerId === userId
                                                        ? "Buyer"
                                                        : "Seller"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="messages"
                                        className="flex flex-col space-y-4 p-3 w-full custom-scrollbar h-[450px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[450px] overflow-y-auto"
                                    >
                                        {currentChat.messages.map(
                                            (
                                                messageObject: any,
                                                index: number
                                            ) => {
                                                return userId ===
                                                    messageObject.senderId ? (
                                                    <div
                                                        key={index}
                                                        className="chat-message"
                                                    >
                                                        <div className="flex items-end justify-end w-full text-left">
                                                            <div className="flex flex-col space-y-2 text-md w-full max-w-xs mx-2 order-1 items-end">
                                                                <p className="max-w-full px-4 py-2 rounded-lg rounded-br-none bg-blue-600 text-white break-words">
                                                                    {
                                                                        messageObject.message
                                                                    }
                                                                </p>
                                                            </div>
                                                            <Avatar
                                                                src="/images/user/avatar1.png"
                                                                alt="avatar"
                                                                size="xs"
                                                                className="order-1"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={index}
                                                        className="chat-message"
                                                    >
                                                        <div className="flex items-end justify-start w-full text-left">
                                                            <div className="flex flex-col space-y-2 text-md w-full max-w-xs mx-2 order-2 items-start">
                                                                <p className="max-w-full px-4 py-2 rounded-lg rounded-bl-none text-primary bg-gray-300 break-words">
                                                                    {
                                                                        messageObject.message
                                                                    }
                                                                </p>
                                                            </div>
                                                            <Avatar
                                                                src="/images/user/avatar1.png"
                                                                alt="avatar"
                                                                size="xs"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                                        <div className="relative">
                                            <input
                                                {...register(
                                                    createMessageFormKeys.CHAT_MESSAGE
                                                )}
                                                type="text"
                                                placeholder="Write your message!"
                                                className="w-full pl-2 pr-10 py-3 rounded-md focus:outline-none focus:placeholder-gray-400 text-primary placeholder-gray-600 bg-gray-200"
                                            />
                                            <button
                                                type="submit"
                                                className="absolute inset-y-0 right-0 mx-2 flex items-center justify-center rounded-full text-primary hover:text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="h-6 w-6 transform rotate-90"
                                                >
                                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
