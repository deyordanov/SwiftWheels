//react-select
import makeAnimated from "react-select/animated";
import Select, { CSSObjectWithLabel } from "react-select";

//constants
import {
    filterFormKeys,
    customStyles,
} from "@/app/utilities/constants/constans";

//shared
import {
    getSelectControlType,
    extractPlaceholder,
} from "@/app/utilities/shared/shared";

//types
import * as customSelectTypes from "@/app/utilities/types/customSelect.typse";

export default function CustomSelect({
    field,
    collection,
    type,
    errors,
}: {
    field: any;
    collection: Array<customSelectTypes.IOption>;
    type: string;
    errors: any;
}) {
    const animatedComponents = makeAnimated();

    return (
        <Select
            {...field}
            onChange={(option: any) =>
                field.onChange(option !== null ? option.value : null)
            }
            value={
                collection.find(
                    (c: any) => (c.value as string | number) === field.value
                ) || null
            }
            isMulti={false}
            components={animatedComponents}
            options={collection as any}
            className="w-full"
            styles={{
                ...customStyles,
                control: (base: CSSObjectWithLabel) =>
                    getSelectControlType(errors, filterFormKeys[type], base),
            }}
            placeholder={`${extractPlaceholder(type)}.....`}
        />
    );
}
