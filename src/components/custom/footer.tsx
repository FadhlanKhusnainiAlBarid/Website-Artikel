import React from "react";
import Image from "next/image";
import LogoWhite from "../../../public/images/logo-white-img.png";

export default function Footer() {
  return (
    <footer className="bg-[#2563EB] py-[37px]">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <Image src={LogoWhite} alt="Logo White" className="h-6" />
        <p className="text-white font-archivo text-sm md:text-base text-nowrap">
          © 2025 Blog genzet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
