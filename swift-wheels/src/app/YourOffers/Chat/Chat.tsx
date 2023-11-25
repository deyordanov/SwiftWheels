"use client";

//hooks
import React, { useEffect, useRef, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/app/Contexts/authContext";

//next-image
import Image from "next/image";

//services
import * as chatService from "@/services/chatService";

//headlessui
import { Dialog, Transition } from "@headlessui/react";

const createMessageFormKeys = {
    CHAT_MESSAGE: "chat-message",
};

const createMessageFormDefaultValues = {
    [createMessageFormKeys.CHAT_MESSAGE]: "",
};

export default function Chat({ isChatModalOpen, setIsChatModalOpen, chat }) {
    const messagesEndRef = useRef(null);
    const [currentChat, setCurrentChat] = useState(chat);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: createMessageFormDefaultValues,
        mode: "onSubmit",
    });

    const { userId } = useAuthContext();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    const handleMessageCreation = async (data: any) => {
        const newChat = await chatService.addMessageToChat(
            chat._id,
            data[createMessageFormKeys.CHAT_MESSAGE],
            userId
        );

        setCurrentChat(newChat);
        console.log(newChat);
        reset();
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
                                <form
                                    onSubmit={handleSubmit(
                                        handleMessageCreation
                                    )}
                                    className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen"
                                >
                                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
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
                                                    <Image
                                                        src="/images/user/avatar1.png"
                                                        alt="My profile"
                                                        className="rounded-full order-1"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <div className="text-2xl mt-1 flex items-center">
                                                    <span className="text-gray-700 mr-3">
                                                        Name Here
                                                    </span>
                                                </div>
                                                <span className="text-lg text-gray-600">
                                                    Buyer
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {/* Replace with your SVGs or Icons */}
                                            {/* ... */}
                                        </div>
                                    </div>
                                    <div
                                        id="messages"
                                        className="flex flex-col space-y-4 p-3 overflow-y-auto scrolling-touch custom-scrollbar"
                                    >
                                        {currentChat.messages.map(
                                            (
                                                messageObject: any,
                                                index: number
                                            ) => {
                                                console.log(messageObject);
                                                console.log(userId);
                                                return userId ===
                                                    messageObject.senderId ? (
                                                    <div
                                                        key={index}
                                                        className="chat-message"
                                                    >
                                                        <div className="flex items-end justify-end">
                                                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                                                <div>
                                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                                                        {
                                                                            messageObject.message
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Image
                                                                src="/images/user/avatar1.png"
                                                                alt="My profile"
                                                                className="w-6 h-6 rounded-full order-1"
                                                                width={6}
                                                                height={6}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={index}
                                                        className="chat-message"
                                                    >
                                                        <div className="flex items-end">
                                                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                                <div>
                                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                                        {
                                                                            messageObject.message
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Image
                                                                src="/images/user/avatar1.png"
                                                                alt="My profile"
                                                                className="w-6 h-6 rounded-full order-1"
                                                                width={6}
                                                                height={6}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                                        <div className="relative flex">
                                            <span className="absolute inset-y-0 flex items-center">
                                                {/* Replace with your SVGs or Icons */}
                                                {/* ... */}
                                            </span>
                                            <input
                                                {...register(
                                                    createMessageFormKeys.CHAT_MESSAGE
                                                )}
                                                type="text"
                                                placeholder="Write your message!"
                                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3"
                                            />
                                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                                {/* <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="h-6 w-6 text-gray-600"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="h-6 w-6 text-gray-600"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                        ></path>
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="h-6 w-6 text-gray-600"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        ></path>
                                                    </svg>
                                                </button> */}
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                                >
                                                    <span className="font-bold">
                                                        Send
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-6 w-6 ml-2 transform rotate-90"
                                                    >
                                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                                    </svg>
                                                </button>
                                            </div>
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
