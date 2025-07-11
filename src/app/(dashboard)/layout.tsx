import React from "react";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>Dashboard {children}</>;
}
