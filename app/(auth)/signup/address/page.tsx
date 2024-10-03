"use client"
import React from "react"
import Link from "next/link"
import { LuChevronLeft } from "react-icons/lu";
import Image from "next/image";
import Logo from "@/public/logo.png";
export default function AddressPage() {

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center px-4 sm:px-0">
            <div className="absolute left-8 top-8 md:right-8 ">
                <Link href="/" className="flex items-center space-x-1.5">
                    <Image src={Logo} alt="logo" className='w-40' />

                </Link>
            </div>
            <div className="z-40 mx-4 flex w-full max-w-lg flex-col gap-3 rounded-3xl bg-white p-8 shadow-xl sm:mx-auto lg:my-16">
                <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-3 py-2">
                        <div className="flex items-center gap-3">
                            <Link href="/signup/personal-info"><LuChevronLeft size={40} className="text-black" /></Link>
                            <p className="font-walsheim-medium  px-4 text-3xl text-black sm:px-8 md:px-16">Address</p>
                        </div>
                        <p className="text-center text-base text-gray-500">Where we should pick up your clothes</p>
                    </div>

                    <input type="email" placeholder="Address" className="w-full rounded-md border border-gray-300 bg-black p-2" />
                    <p className="font-walsheim text-sm uppercase">Add more address details</p>
                    <input type="text" placeholder="Apt # (Optional)" className="w-full rounded-md border border-gray-300 bg-black p-2" />

                    <textarea style={{ scrollbarWidth: 'none' }} cols={10} rows={5} placeholder="Pickup & delivery instructions"
                        className="w-full rounded-md border border-gray-300 bg-black p-2">
                    </textarea>

                    <Link href="/summery" className="w-full rounded-full  bg-black p-3 text-center text-lg text-white">
                        Continue
                    </Link>
                </div>
            </div>
            <div className="fixed bottom-0 mb-4 mt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} Choreless. All rights reserved.
            </div>
        </div>
    )
}