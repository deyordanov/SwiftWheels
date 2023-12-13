//react-select
import makeAnimated from "react-select/animated";
import Select, { CSSObjectWithLabel } from "react-select";

//constants
import {
    filterFormKeys,
    customStyles,
} from "@/app/utilities/constants/constans";

//types
import * as allCarsCustomSelectTypes from "./allCarsCustomSelect.types";

//shared
import {
    getSelectControlType,
    extractPlaceholder,
} from "@/app/utilities/shared/shared";

export default function CustomSelect({
    field,
    collection,
    type,
    errors,
}: allCarsCustomSelectTypes.PropTypes) {
    const animatedComponents = makeAnimated();

    return (
        <Select
            {...field}
            onChange={(option: allCarsCustomSelectTypes.SelectOption) =>
                field.onChange(option ? option.value : null)
            }
            value={
                collection.find((option) => option.value === field.value) ||
                null
            }
            isMulti={false}
            components={animatedComponents}
            options={collection}
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
