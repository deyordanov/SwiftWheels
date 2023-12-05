"use client";

//hooks
import { useEffect } from "react";
import { useAuthContext } from "@/app/Contexts/authContext";

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
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import UserProfile from "../UserProfile/UserProfile";

//Contexts
import { useSearchContext } from "../../Contexts/searchContext";
import { usePageContext } from "@/app/Contexts/pageContext";

export default function Header() {
    const {
        header,
        setHeader,
        navigation,
        isLoginOpen,
        isLogoutOpen,
        handleNavigation,
        handleLoginDialogExitOpen,
        handleLogoutDialogExitOpen,
    } = usePageContext();
    const { searchActive, setSearchActive } = useSearchContext();
    const { isAuthenticated } = useAuthContext();

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

    return (
        <header
            className={`${
                header
                    ? "bg-white shadow-md py-2"
                    : "bg-transparent shadow-none py-4"
            } w-full max-w-[1920px] mx-auto z-20 transition-all duration-300 fixed`}
        >
            {isLoginOpen && (
                <Login handleLoginDialogExitOpen={handleLoginDialogExitOpen} />
            )}
            {isLogoutOpen && (
                <Logout
                    handleLogoutDialogExitOpen={handleLogoutDialogExitOpen}
                />
            )}
            <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="flex justify-between items-center px-4">
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
                    <div
                        onClick={handleNavigation}
                        className="cursor-pointer xl:hidden text-4xl"
                        aria-hidden
                    >
                        {navigation ? <BiX /> : <BiMenuAltRight />}
                    </div>
                </div>
                <div
                    className={`${
                        navigation
                            ? "max-h-max py-8 px-4 xl:py-0 xl:px-0"
                            : "max-h-0 xl:max-h-max"
                    } flex flex-col w-full bg-white gap-y-6 overflow-hidden font-bold xl:font-medium 
          xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150
           text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case text-black items-center`}
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
                    {!isAuthenticated && (
                        <Link
                            to="login"
                            activeClass="login"
                            smooth={desktopMode}
                            spy={true}
                            className="cursor-pointer"
                            onClick={handleLoginDialogExitOpen}
                        >
                            Login
                        </Link>
                    )}
                    {isAuthenticated && (
                        <UserProfile
                            handleLogoutDialogExitOpen={
                                handleLogoutDialogExitOpen
                            }
                        />
                    )}
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
                </div>
            </div>
        </header>
    );
}
