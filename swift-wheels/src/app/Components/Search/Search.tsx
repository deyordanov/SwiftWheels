"use client";

//Components
import LocationSelection from "../LocationSelection/LocationSelection";

//Contexts
import { useSearchContext } from "../../Contexts/searchContext";

export default function Search() {
  const { searchActive } = useSearchContext();
  return (
    <div
      className={`${
        searchActive
          ? "rounded-none xl:h-[80px]"
          : "rounded-[20px] py-6 xl:pr-4 xl:h-[98px]"
      } bg-white hidden xl:block w-full relative shadow-lg`}
    >
      <div className="xl:h-full flex items-center px-6 xl:px-0 ">
        <LocationSelection />
      </div>
    </div>
  );
}
