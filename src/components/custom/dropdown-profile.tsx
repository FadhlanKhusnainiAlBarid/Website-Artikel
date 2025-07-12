"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDialogStore } from "@/state/state";

export default function DropdownProfile({
  openDropdown,
  setOpenDropdown,
}: {
  openDropdown: boolean;
  setOpenDropdown: (open: boolean) => void;
}) {
  const { openDialog, setOpenDialog } = useDialogStore();
  const cookies = useCookies();
  const router = useRouter();
  const pathname = usePathname();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger className="outline-none cursor-pointer flex items-center gap-1.5 font-[family-name:var(--font-archivo)]">
          <div className="bg-[#BFDBFE] size-8 rounded-full flex justify-center items-center text-[#1E3A8A]">
            {auth.username ? auth.username.charAt(0).toUpperCase() : "U"}
          </div>
          <p
            className={`underline hidden md:block ${
              pathname.startsWith("/da")
                ? "text-black"
                : "text-black md:text-white"
            }`}
          >
            {auth.username}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="*:font-archivo *:cursor-pointer">
          <DropdownMenuItem className="text-slate-600" asChild>
            <Link
              href={
                pathname.startsWith("/dashboard")
                  ? "/dashboard/account"
                  : "/account"
              }
            >
              My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenDialog(true)}
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
        open={openDialog}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setOpenDialog(false);
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
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer font-archivo bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                cookies.remove("token");
                cookies.remove("user");
                router.refresh();
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div
        className={`fixed inset-0 z-20 bg-black/50 ${
          openDropdown ? "block" : "hidden"
        }`}
      />
    </>
  );
}
