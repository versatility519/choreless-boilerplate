"use client";

import { useState, useEffect } from "react"
import Link from "next/link"


import { UserAuthForm } from "@/components/forms/user-auth-form"
import { Suspense } from "react"

import Image from "next/image";
import Logo from "@/public/logo.png";
import Landing from "@/public/_static/landing.png";

export default function RegisterPage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const carouselTexts = [
    "Ready to save 5+ hours every week?",
    "Streamline your workflow effortlessly",
    "Boost your productivity with AI",
    "Join thousands of satisfied users"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length)
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className=" flex  w-full flex-col justify-center lg:flex-row">
      <div className="flex h-screen w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:items-start  ">

        <div className="absolute left-8 top-8 md:right-8 ">
          <Link href="/" className="flex items-center space-x-1.5">
            <Image src={Logo} alt="logo" className='w-40' />
          </Link>
        </div>

        <div className="z-40 mb-8 flex max-w-lg flex-col items-center justify-center gap-3 rounded-3xl bg-white  pt-16 shadow-xl lg:mx-auto lg:my-16 ">
          <p className="mb-4 px-2 text-center font-walsheimMedium text-3xl text-black sm:px-4 md:px-16">Ready to save 5+ hours every week?</p>

          <div className="flex w-full flex-col items-center justify-center gap-4 px-8">
            <Suspense>
              <UserAuthForm type="register" />
            </Suspense>
          </div>

          {/* <div className="flex gap-2 items-center text-center  text-gray-600"> */}
          <Link href="/signin">
            <p className="py-8 text-center font-walsheimRegular text-sm text-blue-500 hover:underline">
              Already have an account? Log in
            </p>
          </Link>
          {/* </div> */}
        </div>
      </div>

      <div className="relative w-full lg:h-screen lg:w-1/2">

        <Image src={Landing} alt="logo" className="h-72 w-full rounded-[2rem] object-cover px-4 lg:h-full lg:rounded-none  lg:px-0  " />

        <div className="absolute inset-0 flex justify-center  ">
          {/* <p className=" font-walsheim-bold fixed bottom-48 px-16 text-center text-5xl text-white transition-opacity duration-500">
            {carouselTexts[currentTextIndex]}
          </p> */}
        </div>
      </div>
    </div>
  )
}
