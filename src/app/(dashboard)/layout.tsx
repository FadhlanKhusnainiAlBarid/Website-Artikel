import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavbarDashboard from "@/components/custom/navbar-dashboard";
import SidebarDashboard from "@/components/custom/sidebar-dashboard";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider className="data-[slot='sidebar']:hidden">
        <main className="ml-0 md:ml-[16rem] w-full h-screen">
          <NavbarDashboard />
          <div className="h-[68.3rem] bg-gray-100 p-6">
            <div className="h-full bg-gray-50 border border-slate-200 rounded-xl p-6">
              {children}
            </div>
          </div>
        </main>
        <SidebarDashboard />
      </SidebarProvider>
    </>
  );
}
