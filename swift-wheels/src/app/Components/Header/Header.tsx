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

//Contexts
import { useSearchContext } from "../../Contexts/searchContext";

export default function Header() {
  const { searchActive, setSearchActive } = useSearchContext();
  const [header, setHeader] = useState(false);
  const [navigation, setNavigation] = useState(false);

  const desktopMode = useMediaQuery({
    query: "(min-width: 1300px)",
  });

  useEffect(() => {
    //There is not other way to add a scroll event on the window except for addEventListener() :(
    const handleScroll = () => {
      setHeader(window.scrollY > 40);
      //Might need to change the value later on (for UX)
      setSearchActive(window.scrollY > 1550);
    };

    //Adding an event listener to the window when the component mounts
    window.addEventListener("scroll", handleScroll);

    //This 'cleanup' function will be executed when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
              src={"/icons/logo4.png"}
              width={150}
              height={150}
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
        {/* navigation */}
        <nav
          className={`${
            navigation
              ? "max-h-max py-8 px-4 xl:py-0 xl:px-0"
              : "max-h-0 xl:max-h-max"
          } flex flex-col w-full bg-white gap-y-6 overflow-hidden font-bold xl:font-medium 
          xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150
           text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case text-black`}
        >
          <Link
            to="home"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="cars"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            Cars
          </Link>
          <Link
            to="about"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            About
          </Link>
          <Link
            to="why"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            Why Us
          </Link>
          <Link
            to="testimonials"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            Testimonials
          </Link>
          <Link
            to="contact"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            Contact
          </Link>
          <Link
            to="/"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
            className="xl:hidden btn btn-primary btn-sm max-w-[164px] mx-auto"
          >
            See All Cars
          </Link>
          <SearchMobile />
        </nav>
      </div>
    </header>
  );
}
