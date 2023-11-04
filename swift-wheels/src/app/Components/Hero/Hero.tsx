"use client";

//Components
import Search from "../Search/Search";

//Contexts
import { useSearchContext } from "@/app/Contexts/searchContext";

//next-image
import Image from "next/image";

//motion
import { motion, easeInOut } from "framer-motion";

export default function Hero() {
  const { searchActive } = useSearchContext();
  return (
    <section className="h-screen xl:h-[90vh] bg-[#b2b7c2]/10" id="home">
      {/* <div className="container mx-auto h-full xl:pt-10"> */}
      <div className="container mx-auto h-full xl:pt-10">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-start h-full">
          {/* Feel the Power, Feel the Prestige! */}
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <h1 className="h1">
              Embrace the <span className=" text-accent-default">Power</span>,
              Feel the <span className="text-accent-default">Prestige</span>!
            </h1>
            <p className="description max-w-[550px] mx-auto xl:mx-0 mb-6 xl:mb-10">
              Unleash the road`s thrill! We offer exclusive, high-performance
              tuned cars that define your drive and desire.
            </p>
            <div className="flex gap-x-3 justify-center xl:justify-start">
              <button className="btn-cta">
                <a
                  href="https://play.google.com"
                  target="_blank" //Opens link in a new tab
                  rel="noopener noreferrer" //Will not pass the referrer (URL of the current page) to the new page (prevent attacks)
                >
                  <Image
                    src="/icons/buttons/google-play.svg"
                    width={132}
                    height={36}
                    alt="google-play button"
                  />
                </a>
              </button>
              <button className="btn-cta">
                <a
                  href="https://apps.apple.com"
                  target="_blank" //Opens link in a new tab
                  rel="noopener noreferrer" //Will not pass the referrer (URL of the current page) to the new page (prevent attacks)
                >
                  <Image
                    src="/icons/buttons/app-store.svg"
                    width={132}
                    height={36}
                    alt="google-play button"
                  />
                </a>
              </button>
            </div>
          </div>
          <div>
            <span className="relative w-full h-full max-h-[50vh] md:max-w-[70vw] xl:max-w-[860px] xl:max-h-[542px] xl:absolute xl:-right-[100px] min-[1680px]:right-[120px] xl:top-48">
              <Image
                src={"/images/hero/E63.png"}
                width={750}
                height={750}
                alt="E 63 AMG"
                style={{ objectFit: "contain" }}
                priority
              />
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${
          searchActive
            ? "fixed top-[134px] z-10 w-full max-w-[1920px]"
            : "-mt-12 w-full max-w-[1300px] mx-auto"
        }`}
      >
        <Search />
      </div>
    </section>
  );
}
