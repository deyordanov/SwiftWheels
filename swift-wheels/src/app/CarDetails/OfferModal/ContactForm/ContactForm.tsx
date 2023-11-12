"use client";

//hooks
import { useState } from "react";
import { useForm } from "react-hook-form";

//components
import FormErrorMessage from "@/app/Components/shared/FormErrorMessage";

//react-icons
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

//react-confetti
import Confetti from "react-confetti";

//types
import * as contactFormTypes from "../../../utilities/types/contactForm.types";

//constants
import {
    ContactFormKeys,
    ContactFormDefaultValues,
} from "@/app/utilities/constants/constans";

export default function ContactForm({
    setTabs,
    closeModal,
}: contactFormTypes.propTypes) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: ContactFormDefaultValues,
        mode: "onSubmit",
    });
    const [showConfetti, setShowConfetti] = useState(false);

    const handleReturn = () => {
        setTabs((state) => state.slice(0, -1));
    };

    const onSubmit = (data: any) => {
        console.log(data);
        console.log("Message Recieved!");
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
            closeModal();
        }, 3000);
    };

    return (
        <>
            {/* TODO: Add a thank you note! */}
            {showConfetti && <Confetti className="h-screen w-screen" />}
            <div className="w-full relative flex justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex justify-center items-center w-[70%] text-left"
                >
                    <div className=" w-full p-4 flex flex-col gap-y-2 text-primary text-md items-center">
                        <div className="flex flex-col gap-y-2 w-full">
                            <label htmlFor={ContactFormKeys.NAME}>
                                Full Name:
                            </label>
                            <input
                                {...register(ContactFormKeys.NAME, {
                                    required: "This field is required!",
                                    minLength: {
                                        message:
                                            "The name should be at least 6 characters long!",
                                        value: 6,
                                    },
                                })}
                                type="text"
                                name={ContactFormKeys.NAME}
                                id={ContactFormKeys.NAME}
                                className={`text-md h-[40px] px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none ${
                                    errors[ContactFormKeys.NAME]
                                        ? "border-red-500"
                                        : "border-slate-500"
                                }`}
                            />
                            <FormErrorMessage
                                errors={errors}
                                fieldKey={ContactFormKeys.NAME}
                            />
                        </div>

                        <div className="flex flex-col gap-y-2 w-full">
                            <label htmlFor={ContactFormKeys.EMAIL}>
                                Email:
                            </label>
                            <input
                                {...register(ContactFormKeys.EMAIL, {
                                    required: "This field is required!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email!",
                                    },
                                })}
                                type="text"
                                name={ContactFormKeys.EMAIL}
                                id={ContactFormKeys.EMAIL}
                                className={`text-md h-[40px] px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none ${
                                    errors[ContactFormKeys.EMAIL]
                                        ? "border-red-500"
                                        : "border-slate-500"
                                }`}
                            />
                            <FormErrorMessage
                                errors={errors}
                                fieldKey={ContactFormKeys.EMAIL}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 w-full">
                            <label htmlFor={"message"}>Message:</label>
                            <textarea
                                {...register(ContactFormKeys.MESSAGE, {
                                    required: "This field is required!",
                                    minLength: {
                                        message:
                                            "The message should be at lest 30 characters long!",
                                        value: 30,
                                    },
                                    maxLength: {
                                        message:
                                            "The message shouldn`t be longer than 500 characters!",
                                        value: 500,
                                    },
                                })}
                                name={"message"}
                                id={"message"}
                                className={`min-h-[100px] max-h-[400px] p-2 my-2 text-md px-2 py-1 rounded-lg w-full border-[1.4px] focus:outline-none ${
                                    errors[ContactFormKeys.MESSAGE]
                                        ? "border-red-500"
                                        : "border-slate-500"
                                }`}
                            />
                            <FormErrorMessage
                                errors={errors}
                                fieldKey={ContactFormKeys.MESSAGE}
                            />
                        </div>

                        <button className="w-[60%] bg-green-500 hover:bg-green-700 py-2 rounded-lg text-white">
                            Send
                        </button>
                    </div>
                </form>
                <button
                    onClick={handleReturn}
                    className="absolute -bottom-2 -left-2 text-4xl px-4 py-2"
                >
                    <BsFillArrowLeftCircleFill className="text-gray-300 hover:text-gray-500" />
                </button>
            </div>
        </>
    );
}
