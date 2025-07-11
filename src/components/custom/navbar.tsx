"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../public/images/logo-img.png";
import LogoWhite from "../../../public/images/logo-white-img.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { useCookies } from "next-client-cookies";

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cookies = useCookies();
  const router = useRouter();

  const isDetailPage = pathname.startsWith("/") && pathname.length > 1;

  return (
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
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none cursor-pointer flex items-center gap-1.5 font-[family-name:var(--font-archivo)]">
          <div className="bg-[#BFDBFE] size-8 rounded-full flex justify-center items-center text-[#1E3A8A]">
            J
          </div>
          <p className="underline hidden md:block text-black md:text-white">
            James Dean
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="*:font-archivo *:cursor-pointer">
          <DropdownMenuItem className="text-slate-600" asChild>
            <Link href="/account">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex items-center text-red-500 hover:text-red-500"
          >
            <LogOut className="size-4 text-red-500" />
            <p className="text-sm font-medium text-red-500 hover:text-red-500 font-archivo">
              Log Out
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setOpen(false);
        }}
      >
        <DialogContent className="flex flex-col gap-4 w-[400px] font-archivo [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Logout</DialogTitle>
            <DialogDescription className="text-slate-500">
              Are you sure want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer font-archivo"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer font-archivo bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                cookies.remove("token");
                cookies.remove("user");

                router.push("/auth/login");
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

export default Navbar;
