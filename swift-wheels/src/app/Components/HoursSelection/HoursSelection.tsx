"use client";

//hooks
import { useState } from "react";

//headless ui
import { Menu } from "@headlessui/react";

//react-icons
import { FaClock } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

//constans
import { hours } from "@/app/utilities/constants/constans";

export default function HoursSelection() {
  const [hour, setHour] = useState("8:00 AM");

  const index = hours.indexOf(hour);

  const handleHour = (hour: string) => {
    setHour(hour);
  };

  //TODO: Fix the last hour - 6 PM -> 6 PM
  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row border-l-2">
      <div className="relative flex-1">
        <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
          <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
            <FaClock className="text-accent-default" />
            <span className="text-[15px] uppercase font-bold">
              Select Hours
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <span className="font-medium text-[13px] text-secondary xl:ml-6">
              {hours[index] ?? hour}
            </span>
            <FaArrowRightLong className="text-accent-default text-[12px]" />
            <span className="font-medium text-[13px] text-secondary">
              {hours[index + 1] ?? hour}
            </span>
          </div>
        </Menu.Button>
        <Menu.Items className="dropdown-menu shadow-lg absolute -top-80 xl:top-[90px] left-1/2 xl:left-0 z-10 transform -translate-x-1/2 xl:-translate-x-0 text-sm w-full bg-white max-w-[332px] py-6 rounded-[10px]">
          {hours.map((hour, index) => (
            <li
              onClick={() => handleHour(hour)}
              key={index}
              className="list-none cursor-pointer py-4 hover:bg-gray-50 uppercase text-center"
              aria-hidden
            >
              {hour}
            </li>
          ))}
        </Menu.Items>
      </div>
    </Menu>
  );
}
