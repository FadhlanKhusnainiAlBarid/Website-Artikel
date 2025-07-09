import React from "react";
import Navbar from "@/components/custom/navbar";

export default function Base({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
