import React from "react";
import NavDashboard from "@/components/custom/nav-dashboard";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavDashboard />
      {children}
    </>
  );
}
