"use client";
import React from "react";
import { UserData } from "@/app/(base)/account/page";

export default function Card({ userData }: { userData: UserData }) {
  const password =
    JSON.parse(localStorage.getItem("auth") || "{}").password || "";
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="bg-[#BFDBFE] size-[68px] rounded-full flex justify-center items-center text-2xl text-blue-900 font-semibold">
        {userData.username.charAt(0).toUpperCase()}
      </div>
      <div className="w-full flex items-center justify-between font-semibold py-2.5 px-4 bg-gray-100 border border-slate-200 rounded-md">
        <span className="flex items-center gap-4">
          <p className="w-[75px]">Username</p>:
        </span>
        <p className="w-[210px] text-center">{userData.username}</p>
      </div>
      <div className="w-full flex items-center justify-between font-semibold py-2.5 px-4 bg-gray-100 border border-slate-200 rounded-md">
        <span className="flex items-center gap-4">
          <p className="w-[75px]">Password</p>:
        </span>
        <p className="w-[210px] text-center">{password}</p>
      </div>
      <div className="w-full flex items-center justify-between font-semibold py-2.5 px-4 bg-gray-100 border border-slate-200 rounded-md">
        <span className="flex items-center gap-4">
          <p className="w-[75px]">Role</p>:
        </span>
        <p className="w-[210px] text-center">{userData.role}</p>
      </div>
    </div>
  );
}
