"use client";

//Components
import Search from "../Search/Search";

//Contexts
import { useSearchContext } from "@/app/Contexts/searchContext";

export default function Hero() {
  const { searchActive } = useSearchContext();
  return (
    <section className="h-screen xl:h-[90vh] bg-[#b2b7c2]/10" id="home">
      <div className="container mx-auto h-full xl:pt-10">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-start h-full">
          {/* Feel the Power, Feel the Prestige! */}
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <h1 className="h1">
              Feel the <span className=" text-accent-default">Power</span>, Feel
              the <span className="text-accent-default">Prestige</span>!
            </h1>
          </div>
          <div>
            <span>image</span>
          </div>
        </div>
        <div
          className={`${
            searchActive
              ? "fixed top-[140px] z-10 w-full max-w-[1920px]"
              : "-mt-12 w-full max-w-[1300px] mx-auto"
          }`}
        >
          <Search />
        </div>
      </div>
    </section>
  );
}
