"use client";

import { useState } from "react";
import { toast } from "sonner";

import StatSection from "@/app/components/admin-section/StatSection";
import OverviewSection from "@/app/components/admin-section/OverviewSection";
import CreateSection from "@/app/components/admin-section/CreateSection";

import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
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

  const createConcertMutation = useMutation({
    mutationFn: (newConcert: {
      name: string;
      description: string;
      total_seats: number;
    }) => api.post("/concerts", newConcert),
    onSuccess: () => {
      // Invalidate or refetch concerts query so the list updates automatically
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      toast.success("Created successfully");

      setActiveTab("overview");
    },
    onError: () => () => toast.error("Failed to create"),
  });

  return (
    <div className="flex flex-col justify-center">
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
        {activeTab === "create" && (
          <CreateSection
            onSave={(name, description, totalSeats) =>
              createConcertMutation.mutate({
                name,
                description,
                total_seats: totalSeats,
              })
            }
          />
        )}
      </div>
    </div>
  );
}
