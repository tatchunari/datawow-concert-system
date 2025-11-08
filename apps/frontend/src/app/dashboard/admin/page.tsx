"use client";

import { useState } from "react";
import StatSection from "@/app/components/admin-section/StatSection";
import OverviewSection from "@/app/components/admin-section/OverviewSection";
import CreateSection from "@/app/components/admin-section/CreateSection";

export default function AdminDashboardPage() {
  // Track which tab is active
  const [activeTab, setActiveTab] = useState<"overview" | "create">("overview");

  // Track selected concert for passing into StatSection
  const [selectedConcert, setSelectedConcert] = useState<{
    id: number;
    name: string;
    total_seats: number;
    available_seats: number;
    reserved_seats: number;
    cancelled_seats: number;
  } | null>(null);

  return (
    <div>
      {/* Stats Section */}
      <StatSection selectedConcert={selectedConcert} />

      {/* Tabs Section */}
      <div className="flex flex-col mt-10">
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

        {/* Section switching */}
        {activeTab === "overview" && (
          <OverviewSection onSelectConcert={setSelectedConcert} />
        )}
        {activeTab === "create" && <CreateSection />}
      </div>
    </div>
  );
}
