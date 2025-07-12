"use client";
import React from "react";
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
} from "@/components/ui/sidebar";
import { Newspaper, Tag, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDialogStore } from "@/state/state";

export default function SidebarDashboard() {
  const { setOpenDialog } = useDialogStore();
  const pathname = usePathname();

  return (
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
                  } active:bg-blue-800 active:text-white`}
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
                  } active:bg-blue-800 active:text-white`}
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
                <SidebarMenuButton
                  onClick={() => setOpenDialog(true)}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:text-white text-white hover:text-white"
                >
                  <LogOut className="size-5" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
