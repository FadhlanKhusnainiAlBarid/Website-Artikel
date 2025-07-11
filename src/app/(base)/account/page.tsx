"use server";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { cookies } from "next/headers";
import Card from "@/components/section/base/account/card";

export interface UserData {
  createdAt: string;
  id: string;
  role: string;
  updatedAt: string;
  username: string;
  password?: string;
}

async function Account() {
  // Simulate fetching user data
  const cookieStore = await cookies();
  async function fetchUserData(): Promise<UserData> {
    try {
      const response = await axiosInstance.get("/auth/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return {
        createdAt: "",
        id: "",
        role: "",
        updatedAt: "",
        username: "",
      };
    }
  }

  const userData = await fetchUserData();
  return (
    <div className="h-[calc(100vh-8.36rem)] md:h-[calc(100vh-6.15rem)] flex justify-center items-center px-5 md:px-0 pt-[4rem] md:pt-0">
      <div className="w-[400px] flex flex-col items-center gap-9 py-6 px-4">
        <h1 className="text-xl font-semibold text-slate-900">User Profile</h1>
        <Card userData={userData} />
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

export default Account;
