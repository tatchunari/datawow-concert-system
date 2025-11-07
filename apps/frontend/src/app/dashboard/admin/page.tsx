"use client";
import CreateSection from "@/app/components/admin-section/CreateSection";
import OverviewSection from "@/app/components/admin-section/OverviewSection";
import StatSection from "@/app/components/admin-section/StatSection";

import { useState } from "react";
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "create">("overview");

  return (
    <div>
      {/* Stats Card Section */}
      <StatSection />

      {/* Overview and Create Section */}
      <div className="flex flex-col mt-10">
        {/* Tabs */}
        <div className="flex flex-row gap-5 mb-6 mx-10">
          <button
            onClick={() => setActiveTab("overview")}
            className={`font-roboto font-semibold p-2 ${
              activeTab === "overview"
                ? "text-[#1692EC] border-b-2 border-b-[#1692EC]"
                : "text-gray-500"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`font-roboto font-semibold p-2 ${
              activeTab === "create"
                ? "text-[#1692EC] border-b-2 border-b-[#1692EC]"
                : "text-gray-500"
            }`}
          >
            Create
          </button>
        </div>

        {/* Sections */}
        {activeTab === "overview" && <OverviewSection />}
        {activeTab === "create" && <CreateSection />}
      </div>
    </div>
  );
}
