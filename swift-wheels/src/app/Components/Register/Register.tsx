//hooks
import { Fragment, useState } from "react";

//headless ui
import { Dialog, Transition } from "@headlessui/react";

//next-image
import Image from "next/image";

//components
import Login from "../Login/Login";

export default function Register() {
  // State to manage dialog open/close
  const [isOpen, setIsOpen] = useState(true);
  const [login, setLogin] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    setLogin((state) => !state);
  };

  if (login) return <Login handleLogin={() => {}} />;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[500px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <section className="flex justify-center items-center">
                <div className=" w-full p-4 flex flex-col gap-y-6 text-primary ext-xl">
                  <h1 className="text-center font-bold text-[36px]">
                    <b>Welcome</b>
                  </h1>
                  <div className="flex justify-between">
                    {/* Not real links -> they will lead to the login pages of the corresponding websites */}
                    <a
                      href="https://myaccount.google.com/intro/signing-in-to-google"
                      target="_blank"
                      className="flex items-center gap-x-1 xl:text-[16px] text-[11px]  border-slate-500 border-[1.4px] xl:px-3 px-1 py-1 rounded-md hover:bg-slate-50"
                    >
                      <Image
                        src="/icons/buttons/google.svg"
                        alt=""
                        width={25}
                        height={25}
                      />
                      Sign up with Google
                    </a>
                    <a
                      href="https://appleid.apple.com/sign-in"
                      target="_blank"
                      className="flex items-center gap-x-1 xl:text-[16px] text-[11px]  border-slate-500 border-[1.4px] xl:px-3 px-1 py-0.5 rounded-md hover:bg-slate-50"
                    >
                      <Image
                        src="/icons/buttons/apple-black.svg"
                        alt=""
                        width={25}
                        height={25}
                      />
                      Sign up with Apple
                    </a>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex-grow border-t-2 border-slate-400"></div>
                    <span className="flex-shrink mx-4 text-secondary">or</span>
                    <div className="flex-grow border-t-2 border-slate-400"></div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="text-md h-[40px] px-2 py-1 rounded-lg w-full border-slate-500 border-[1.4px]"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="text-md h-[40px] px-2 py-1 rounded-lg w-full border-slate-500 border-[1.4px]"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="confirm-password">Confirm password:</label>
                    <input
                      type="confirm-password"
                      name="confirm-password"
                      id="confirm-password"
                      className="text-md h-[40px] px-2 py-1 rounded-lg w-full border-slate-500 border-[1.4px]"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[15px]">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="scale-125"
                      />
                      <span className="ml-2">
                        {" "}
                        I accept the{" "}
                        <span className="text-accent-default">
                          Terms And Conditions
                        </span>
                      </span>
                    </label>
                  </div>
                  <button className="w-full bg-accent-default hover:bg-accent-hover py-2 rounded-lg text-white z-1000">
                    Create an account
                  </button>
                  <div className="flex text-[15px] gap-x-1">
                    <p>Already have an account?</p>
                    <p
                      className="text-accent-default hover:underline cursor-pointer"
                      onClick={handleLogin}
                      aria-hidden
                    >
                      Login here!
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
