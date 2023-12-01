import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import * as React from "react";
import { Fragment } from "react";
import { BiSolidUser } from "react-icons/bi";

export default function FadeMenu() {
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
                    <Menu.Items className=" absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <div>Hello</div>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <div>Hello</div>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <div>Hello</div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
