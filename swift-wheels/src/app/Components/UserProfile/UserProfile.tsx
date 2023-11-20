//react
import { Fragment } from "react";

//next-link
import Link from "next/link";

//react-icons
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import { MdAttachMoney, MdSell } from "react-icons/md";
import { IoCarSportSharp } from "react-icons/io5";

//headless-ui
import { Menu, Transition } from "@headlessui/react";

export default function UserProfile({
    handleLogoutDialogExitOpen,
}: {
    handleLogoutDialogExitOpen: () => void;
}) {
    return (
        <div className="text-right cursor-pointer">
            <Menu as="div" className="text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center px-4 py-2 text-sm font-medium ">
                        <BiSolidUser className="text-2xl" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <Link
                                    href="/CreateCar"
                                    className={`hover:bg-slate-50 group flex gap-x-2 w-full items-center rounded-md px-2 py-2 text-sm hover:text-accent-hover`}
                                >
                                    <MdAttachMoney className="ml-1 text-2xl" />
                                    Sell Your Car
                                </Link>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <Link
                                    href="/AllCars"
                                    className={`hover:bg-slate-50 group flex gap-x-2 w-full items-center rounded-md px-2 py-2 text-sm hover:text-accent-hover`}
                                >
                                    <IoCarSportSharp className="ml-1 text-2xl" />
                                    All Cars
                                </Link>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    className={`hover:bg-slate-50 group gap-x-2 flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-accent-hover`}
                                    onClick={handleLogoutDialogExitOpen}
                                >
                                    <BiLogOut className="text-2xl" />
                                    Logout
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
