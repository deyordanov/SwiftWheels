"use client";

//hooks
import { useState } from "react";

//headless ui
import { Menu } from "@headlessui/react";

//react-icons
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

//react-date-range
import { DateRange, RangeKeyDict } from "react-date-range";
import { format, addDays } from "date-fns";

//react-date-range css
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

//constans
import { setDateDefaultValues } from "@/app/utilities/constants/constans";

export default function DateSelection() {
  const [date, setDate] = useState([setDateDefaultValues]);

  const handleDate = (item: RangeKeyDict) => {
    setDate([item.selection]);
  };

  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row">
      <div className="relative flex-1">
        <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
          <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
            <FaCalendarAlt className="text-accent-default" />
            <span className="text-[15px] uppercase font-bold">Select Date</span>
          </div>
        </Menu.Button>
        <Menu.Items className=" dropdown-menu shadow-lg absolute -top-96 xl:top-[90px] left-1/2 xl:left-0 z-50 transform -translate-x-1/2 xl:-translate-x-0 rounded-[10px] overflow-hidden">
          <DateRange
            onChange={(item) => handleDate(item)}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={date}
            rangeColors={["#ed1d24"]}
            minDate={addDays(new Date(), 0)} //This way the user will not be able to select a date earlier than the current one
          />
        </Menu.Items>
      </div>
    </Menu>
  );
}
