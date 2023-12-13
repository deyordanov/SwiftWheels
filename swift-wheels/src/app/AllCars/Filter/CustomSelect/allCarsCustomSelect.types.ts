//constants
import { filterFormKeys } from "@/app/utilities/constants/constans";

//types
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export type IOption = {
    value: string;
    label: string;
};

export type SelectOption = IOption | null;

export interface PropTypes {
    field: ControllerRenderProps<FieldValues, string>;
    collection: Array<IOption>;
    type: keyof typeof filterFormKeys;
    errors: Record<string, any>;
}
