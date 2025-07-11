"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/logo-img.png";
import LogoWhite from "../../../public/images/logo-white-img.png";
import DropdownProfile from "./dropdown-profile";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();

  const isDetailPage = pathname.startsWith("/") && pathname.length > 1;

  return (
    <>
      <nav
        className={`fixed flex justify-between items-center w-full h-16 md:h-fit bg-white md:bg-transparent ${
          isDetailPage && "md:bg-white border border-slate-200"
        } px-5 md:px-[60px] py-4 md:py-8 z-20`}
      >
        <Link href="/">
          <Image
            src={LogoWhite}
            alt="Logo Whites"
            className={`hidden ${isDetailPage ? "md:hidden" : "md:block"}`}
          />
          <Image
            src={Logo}
            alt="Logo"
            className={`block ${
              isDetailPage ? "md:block" : "md:hidden"
            } h-[22px]`}
          />
        </Link>
        <DropdownProfile
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      </nav>
      <div
        className={`fixed inset-0 z-20 bg-black/50 ${
          openDropdown ? "block" : "hidden"
        }`}
      />
    </>
  );
}

export default Navbar;
