import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Account() {
  return (
    <div className="h-[calc(100vh-8.36rem)] md:h-[calc(100vh-6.15rem)] flex justify-center items-center px-5 md:px-0 pt-[4rem] md:pt-0">
      <div className="w-[400px] flex flex-col items-center gap-9 py-6 px-4">
        <h1 className="text-xl font-semibold text-slate-900">User Profile</h1>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="bg-[#BFDBFE] size-[68px] rounded-full flex justify-center items-center text-2xl text-blue-900 font-semibold">
            J
          </div>
          <div className="w-full flex items-center justify-between font-semibold py-2.5 px-4 bg-gray-100 border border-slate-200 rounded-md">
            <span className="flex items-center gap-4">
              <p className="w-[75px]">Username</p>:
            </span>
            <p className="w-[210px] text-center">JohnDoe</p>
          </div>
          <div className="w-full flex items-center justify-between font-semibold py-2.5 px-4 bg-gray-100 border border-slate-200 rounded-md">
            <span className="flex items-center gap-4">
              <p className="w-[75px]">Password</p>:
            </span>
            <p className="w-[210px] text-center">Admin123</p>
          </div>
          <div className="w-full flex items-center justify-between font-semibold py-2.5 px-4 bg-gray-100 border border-slate-200 rounded-md">
            <span className="flex items-center gap-4">
              <p className="w-[75px]">Role</p>:
            </span>
            <p className="w-[210px] text-center">User</p>
          </div>
        </div>
        <Button
          asChild
          className="h-10 w-full font-archivo bg-blue-600 hover:bg-blue-700"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
