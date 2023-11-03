"use client";

//Components
import Search from "../Search/Search";

//Contexts
import { useSearchContext } from "@/app/Contexts/searchContext";

export default function Hero() {
  const { searchActive } = useSearchContext();
  return (
    <section className="h-screen xl:h-[90vh] bg-[#b2b7c2]/10" id="home">
      <div className="container mx-auto h-full xl:pt-10">hero container</div>
      <div
        className={`${
          searchActive
            ? "fixed top-[140px] z-10 w-full max-w-[1920px]"
            : "-mt-12 w-full max-w-[1300px] mx-auto"
        }`}
      >
        <Search />
      </div>
    </section>
  );
}
