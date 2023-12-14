//types
import { OnSubmit } from "@/app/CarDetails/OfferModal/ContactForm/carDetailsContactForm.types";
import { FieldErrors } from "react-hook-form";

export type propTypes = {
    errors: FieldErrors<Record<string, any>>;
    fieldKey: string;
};
