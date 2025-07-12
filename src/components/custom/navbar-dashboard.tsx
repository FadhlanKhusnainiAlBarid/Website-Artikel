"use client";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DropdownProfile from "./dropdown-profile";
import { usePathname } from "next/navigation";

export default function NavbarDashboard() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <nav className="flex items-center justify-between bg-white border-b border-slate-200 py-5 px-6 font-archivo">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-bold capitalize">
            {pathname.split("/").pop()}
          </h1>
        </div>
        <DropdownProfile
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      </nav>
    </>
  );
}
