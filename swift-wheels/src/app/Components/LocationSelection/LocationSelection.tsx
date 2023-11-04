"use client";

//hooks
import { useState } from "react";

//headless ui
import { Menu } from "@headlessui/react";

//react-icons
import { FaMapMarkerAlt } from "react-icons/fa";

//constants
import { locations } from "@/app/utilities/constants/constans";

export default function LocationSelection() {
  const [location, setLocation] = useState("Select Location");

  const handleLocation = (location: string) => {
    setLocation(location);
  };

  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row">
      <div className="relative flex-1">
        <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
          <div className="w-full h-16 xl:h-full flex justify-center xl:justify-start xl:border-r xl:border-black/10">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
                <FaMapMarkerAlt className="text-accent-default" />
                <span className="text-[15px] uppercase font-bold">
                  Select Location
                </span>
              </div>
              <span className="uppercase font-medium text-[13px] text-secondary text-center xl:ml-6 xl:text-left">
                {location}
              </span>
            </div>
          </div>
        </Menu.Button>
        <Menu.Items className="dropdown-menu shadow-lg absolute -top-80 xl:top-[90px] left-1/2 xl:left-0 z-10 transform -translate-x-1/2 xl:-translate-x-0 text-sm text-center xl:text-left w-full bg-white max-w-[332px] py-6 rounded-[10px]">
          {locations.map((location, index) => (
            <li
              onClick={() => handleLocation(location)}
              key={index}
              className="list-none cursor-pointer py-4 hover:bg-gray-50 uppercase text-center"
              aria-hidden
            >
              {location}
            </li>
          ))}
        </Menu.Items>
      </div>
    </Menu>
  );
}
