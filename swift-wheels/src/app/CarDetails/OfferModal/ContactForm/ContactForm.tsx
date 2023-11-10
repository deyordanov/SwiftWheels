"use client";

//hooks
import { useForm } from "react-hook-form";

//components
import FormErrorMessage from "@/app/Components/shared/FormErrorMessage";

//constants
import {
    ContactFormKeys,
    ContactFormDefaultValues,
} from "@/app/utilities/constants/constans";

export default function ContactForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: ContactFormDefaultValues,
        mode: "onSubmit",
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     alert("Thank you for your message. We will get back to you shortly!");
    // };

    const onSubmit = (data: any) => {
        //Implement a better onSubmit function
        //on submit -> close window?
        console.log(data);
        console.log("Message Recieved!");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center w-[70%] text-left"
        >
            <div className=" w-full p-4 flex flex-col gap-y-2 text-primary text-md items-center">
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor={ContactFormKeys.NAME}>Full Name:</label>
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
                    <label htmlFor={ContactFormKeys.EMAIL}>Email:</label>
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
    );
}
