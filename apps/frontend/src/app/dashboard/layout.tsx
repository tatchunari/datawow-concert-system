"use client";

import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"admin" | "user">("admin");

  const handleSwitch = () => {
    setMode((prev) => (prev === "admin" ? "user" : "admin"));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar mode={mode} onSwitch={handleSwitch} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
