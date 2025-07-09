import React from "react";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";

export default function Base({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
