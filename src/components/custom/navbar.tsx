"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/logo-img.png";
import LogoWhite from "../../../public/images/logo-white-img.png";

function Navbar() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isDetailPage = pathname.startsWith("/") && pathname.length > 1;

  useEffect(() => {
    console.log(pathname);
  }, []);
  return (
    <nav
      className={`fixed flex justify-between items-center w-full h-16 md:h-fit bg-white md:bg-transparent ${
        isDetailPage && "md:bg-white border border-slate-200"
      } px-5 md:px-[60px] py-4 md:py-8 z-20`}
    >
      <Image
        src={LogoWhite}
        alt="Logo Whites"
        className={`hidden ${isDetailPage ? "md:hidden" : "md:block"}`}
      />
      <Image
        src={Logo}
        alt="Logo"
        className={`block ${isDetailPage ? "md:block" : "md:hidden"} h-[22px]`}
      />
      <div className="cursor-pointer flex items-center gap-1.5 font-[family-name:var(--font-archivo)]">
        <div className="bg-[#BFDBFE] size-8 rounded-full flex justify-center items-center text-[#1E3A8A]">
          J
        </div>
        <p className="underline hidden md:block text-black md:text-white">
          James Dean
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
