import { Metadata } from "next";
import Link from "next/link";

import Image from "next/image";
import Logo from "@/public/logo.png";

export const metadata: Metadata = {
    title: "Forget Password",
    description: "Forget Password",
};

export default function ForgotPasswordPage() {
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

                <div className=" my-36 flex w-full max-w-lg  flex-col items-center justify-center gap-3 rounded-3xl bg-white py-8 shadow-xl">
                    <h1 className="font-walsheim-medium text-3xl text-black">Forgot Password</h1>
                    <p className="px-8 text-center text-base text-gray-500">
                        Enter your email and we&apos;ll send you instructions for creating a new password.
                    </p>
                    <div className="flex w-full flex-col items-center justify-center gap-4 px-8">
                        <input type="email" placeholder="Email or phone number" className="w-full rounded-md border border-gray-300 p-2" />
                        <Link href="/summery" className="w-full rounded-full bg-black p-3 text-center text-lg text-white">
                            <p>Reset Password</p>
                        </Link>

                        <div className="flex items-center gap-2 text-center text-sm text-gray-600">
                            <p> Don&apos;t have an account?</p>
                            <Link href="/signup">
                                <p className="font-semibold text-black hover:underline">
                                    Sign up
                                </p>
                            </Link>
                        </div>
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