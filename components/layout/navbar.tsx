"use client";

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import Logo from "@/public/logo.png";
import { UrlObject } from "url";
import router from "next/router";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);

  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  return (
    <header
      className={`sticky top-2 z-40 mx-4  w-full max-w-6xl rounded-2xl bg-white py-4 text-base shadow-lg sm:px-6 xl:mx-auto`}
    >
      <MaxWidthWrapper
        className="flex items-center justify-between "
        large={documentation}
      >
        <Link href="/" className="flex items-center space-x-1.5">
          <Image src={Logo} alt="logo" className='w-40' />
          {/* <Icons.logo />
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span> */}
        </Link>

        <div className='flex items-center gap-2'>
          {links && links.length > 0 ? (
            <nav className="hidden gap-2 md:flex">
              {links.map((item, index) => (
                // {links.map((item: { disabled: any; href: string | UrlObject; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 font-walsheimMedium text-base text-[#6F6E74]  transition-colors hover:bg-slate-300 hover:text-foreground/80",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "text-black"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}

          {/* right header for docs */}
          {documentation ? (
            <div className="hidden flex-1 items-center space-x-4 sm:justify-end lg:flex">
              <div className="hidden lg:flex lg:grow-0">
                <DocsSearch />
              </div>
              <div className="flex lg:hidden">
                <Icons.search className="size-6 text-muted-foreground" />
              </div>
              <div className="flex space-x-4">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="size-7" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          ) : null}

          {session ? (
            <Link
              href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="hidden md:block"
            >
              <Button
                className="gap-2 px-5"
                variant="default"
                size="sm"
                rounded="full"
              >
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : status === "unauthenticated" ? (
            <Link href="/signin" className='flex items-center gap-2 text-nowrap rounded-lg border border-black p-2 font-walsheimMedium text-sm text-black hover:border-slate-300 hover:bg-slate-300'>
              <span>Sign in</span>
              <Icons.arrowRight className="size-4" />
            </Link>
          ) : (
            <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
          )}
          <Link href="/schedule-my-pickup" className=" flex items-center gap-2 text-nowrap rounded-md border border-transparent bg-indigo-600 p-2 font-walsheimMedium  text-sm font-medium text-white hover:bg-indigo-700  ">
            <span>Schedule my pickup</span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </header >
  );
}
