"use client";

//hooks
import { useEffect, useState } from "react";

//next-image
import Image from "next/image";

//react-scroll
import { Link } from "react-scroll";

//media query
import { useMediaQuery } from "react-responsive";

//react-icons
import { BiX, BiMenuAltRight } from "react-icons/bi";

//Components
import SearchMobile from "../Search/SearchMobile/SearchMobile";

export default function Header() {
  const [header, setHeader] = useState(false);
  const [navigation, setNavigation] = useState(false);

  const desktopMode = useMediaQuery({
    query: "(min-width: 1300px)",
  });

  useEffect(() => {
    //There is not other way to add a scroll event on the window except for addEventListener() :(
    const handleScroll = () => {
      setHeader(window.scrollY > 40);
    };

    //Adding an event listener to the window when the component mounts
    window.addEventListener("scroll", handleScroll);

    //This 'cleanup' function will be executed when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = () => {
    setNavigation((state) => !state);
  };

  return (
    <header
      className={`${
        header ? "bg-white shadow-md py-2" : "bg-transparent shadow-none py-4"
      } fixed w-full max-w-[1920px] mx-auto z-20 transition-all duration-300`}
    >
      <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <div className="flex justify-between items-center px-4">
          {/* Logo */}
          <Link
            to="home"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            <Image
              src={"/icons/logo2.png"}
              width={80}
              height={80}
              alt="logo"
              priority
            />
          </Link>
          {/* navigation open / close menu */}
          <div
            onClick={handleNavigation}
            className="cursor-pointer xl:hidden text-4xl"
            aria-hidden
          >
            {navigation ? <BiX /> : <BiMenuAltRight />}
          </div>
        </div>
      </div>
    </header>
  );
}
