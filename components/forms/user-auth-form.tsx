"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/shared/icons";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [isFacebookLoading, setIsFacebookLoading] = React.useState<boolean>(false);
  const [isAppleLoading, setIsAppleLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("resend", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast.error("Something went wrong.", {
        description: "Your sign in request failed. Please try again."
      });
    }

    return toast.success("Check your email", {
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {type != 'register' ?
            <div className="flex flex-col gap-2">
              <div className="grid gap-1">
                {/* <input type="email" placeholder="Email or phone number" className="w-full rounded-md border border-gray-300 p-2" />
            <input type="password" placeholder="Password" className="w-full rounded-md border border-gray-300 p-2" /> */}
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Email or phone number"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading || isGoogleLoading}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                {/* <input type="email" placeholder="Email or phone number" className="w-full rounded-md border border-gray-300 p-2" />
            <input type="password" placeholder="Password" className="w-full rounded-md border border-gray-300 p-2" /> */}
                <Label className="sr-only" htmlFor="email">
                  Password
                </Label>
                <Input
                  id="email"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading || isGoogleLoading}
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            :
             ''
          }

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {type === "register" ? "Sign Up with Email" : "Sign In"}
          </button>
        </div>
      </form>

      {type != 'register' && (
        <div className="flex w-full flex-col items-center justify-center gap-2 px-8">
          <div className="w-full  text-center">
            <Link href="/forgot-password">
              <p className="text-sm text-gray-600 underline">
                Forgot password?
              </p>
            </Link>
          </div>
          <div className="flex justify-center gap-2 text-center text-sm text-gray-600">
            <p> Don&apos;t have an account?</p>
            <Link href="/signup">
              <p className="font-semibold text-black hover:underline">
                Sign up
              </p>
            </Link>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <button className="flex w-full cursor-pointer items-center gap-4 rounded-full border border-black  p-2 px-4 text-black"
        type="button"
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <FcGoogle size={28} />
          // <Icons.google className="mr-2 size-4" />
        )}{" "}
        <p className="font-walsheimMedium text-sm ">Continue with Google</p>
      </button>

      <button className="flex w-full cursor-pointer items-center gap-4 rounded-full border border-black  p-2 px-4 text-black"
        type="button"
        onClick={() => {
          setIsFacebookLoading(true);
          signIn("facebook");
        }}
        disabled={isLoading || isFacebookLoading}
      >
        {isFacebookLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <FaFacebook size={28} />
          // <Icons.google className="mr-2 size-4" />
        )}{" "}
        <p className="font-walsheimMedium text-sm">Continue with Facebook</p>
      </button>
      <button className="flex w-full cursor-pointer items-center gap-4 rounded-full border border-black  p-2 px-4 text-black"
        type="button"
        onClick={() => {
          setIsAppleLoading(true);
          signIn("apple");
        }}
        disabled={isLoading || isAppleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <FaApple size={28} />
          // <Icons.google className="mr-2 size-4" />
        )}{" "}
        <p className="font-walsheimMedium text-sm">Continue with Apple</p>
      </button>
    </div>
  );
}
