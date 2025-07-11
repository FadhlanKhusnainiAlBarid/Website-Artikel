"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoWhite from "../../../public/images/logo-white-img.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Newspaper, Tag, LogOut } from "lucide-react";
import DropdownProfile from "./dropdown-profile";
import { usePathname } from "next/navigation";

export default function NavDashboard() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <SidebarProvider className="data-[slot='sidebar']:hidden">
        <main className="ml-0 md:ml-[16rem] w-full h-screen bg-amber-300">
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
        </main>
        <Sidebar>
          <SidebarContent className="bg-blue-600">
            <SidebarGroup className="pt-6">
              <SidebarGroupLabel>
                <Image src={LogoWhite} alt="Logo" className="h-6" />
              </SidebarGroupLabel>
              <SidebarGroupContent className="font-archivo">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`cursor-pointer  hover:text-white ${
                        pathname === "/dashboard/articles"
                          ? "bg-blue-500 hover:bg-blue-500"
                          : "hover:bg-blue-700"
                      }`}
                      asChild
                    >
                      <Link
                        href="/dashboard/articles"
                        className="text-white flex items-center gap-2"
                      >
                        <Newspaper className="size-5" /> Artikel
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`cursor-pointer  hover:text-white ${
                        pathname === "/dashboard/category"
                          ? "bg-blue-500 hover:bg-blue-500"
                          : "hover:bg-blue-700"
                      }`}
                      asChild
                    >
                      <Link
                        href="/dashboard/category"
                        className="text-white flex items-center gap-2"
                      >
                        <Tag className="size-5" /> Category
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white">
                      <LogOut className="size-5" />
                      Logout
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
