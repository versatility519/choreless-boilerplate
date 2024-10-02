import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/forms/user-auth-form";
import Image from "next/image";
import Logo from "@/public/logo.png";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 sm:px-0">
      <div className="absolute left-8 top-8 md:right-8 ">
        <Link href="/" className="flex items-center space-x-1.5">
          <Image src={Logo} alt="logo" className='w-40' />
          {/* <Icons.logo />
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span> */}
        </Link>
      </div>
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-3 rounded-3xl bg-white  py-8 shadow-xl md:my-16">

        <h1 className="text-3xl font-bold text-black">Hello there!</h1>
        <p className="text-center text-base text-gray-500">Enter your email to sign in to your account</p>

        <div className="flex w-full flex-col items-center justify-center gap-4 px-8">
          <Suspense>
            <UserAuthForm />
          </Suspense>
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