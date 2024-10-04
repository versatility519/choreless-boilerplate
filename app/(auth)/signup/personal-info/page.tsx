"use client"

import { MouseEventHandler, useState } from "react";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
import Image from "next/image";
import Logo from "@/public/logo.png";

export default function PersonalInfoPage() {
    const [showAddress, setShowAddress] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const handleContinue = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowAddress(true);
    };

    const handleBack = () => {
        setShowAddress(false);
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center px-4 sm:px-0">
            <div className="absolute left-8 top-8 md:right-8 ">
                <Link href="/" className="flex items-center space-x-1.5">
                    <Image src={Logo} alt="logo" className='w-40' />
                </Link>
            </div>

            <div className="z-40 mx-4 flex w-full max-w-lg flex-col gap-3 rounded-3xl bg-white p-8 shadow-xl sm:mx-auto lg:my-16">
                <div className=" flex flex-col gap-4">
                    <div className="flex w-full items-center py-4 text-start">
                        <button onClick={handleBack} className="">
                            <LuChevronLeft size={40} className="text-black" />
                        </button>
                        <p className="font-walsheim-medium mr-2 px-2 text-center text-3xl text-black sm:px-8 md:px-16">
                            {showAddress ? "Add your address" : "Let's get started"}
                        </p>
                    </div>
                    {!showAddress ? (
                        <>
                            <div className="flex w-full gap-3">
                                <input type="text" placeholder="First Name" className="w-full rounded-md border border-gray-300  bg-white p-2" />
                                <input type="text" placeholder="Last Name" className="w-full rounded-md border border-gray-300 bg-white  p-2" />
                            </div>
                            <input type="number" placeholder="Phone Number" className="w-full rounded-md border border-gray-300  bg-white  p-2" />
                            <input type="email" placeholder="Email" className="w-full rounded-md border border-gray-300  bg-white p-2" />
                            <input type="password" placeholder="Create password" className="w-full rounded-md border border-gray-300  bg-white p-2" />

                            <p className="px-2 py-4 text-center text-sm text-gray-600">
                                By selecting continue, you agree to receive service and marketing auto-sent texts from Choreless. Opt-out anytime on your &quot;My Account&quot; page or text &quot;STOP&quot;. Message &amp; data rates may apply. By continuing, you also agree to our Terms and Privacy Policy.
                            </p>

                            <button onClick={handleContinue} className="w-full rounded-full bg-black p-3 text-center text-lg text-white">
                                Continue
                            </button>
                        </>
                    ) : (
                        <>
                            <input type="text" placeholder="Address" className="w-full rounded-md border border-gray-300 bg-white p-2" />
                            <p className="font-walsheim text-sm uppercase">Add more address details</p>
                            <input type="text" placeholder="Apt # (Optional)" className="w-full rounded-md border border-gray-300 bg-white p-2" />
                            <textarea style={{ scrollbarWidth: 'none' }} cols={8} rows={5} placeholder="Pickup & delivery instructions"
                                className="w-full rounded-md border border-gray-300 bg-white p-2">
                            </textarea>
                            <Link href="/summery" className="w-full rounded-full  bg-black p-3 text-center text-lg text-white">
                                Continue
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <footer className="absolute bottom-4">
                <p className="mt-8 text-sm text-gray-500">
                    © {new Date().getFullYear()} Choreless. All rights reserved.
                </p>
            </footer>
        </div>
    );
}