"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import ConcertTable from "@/app/components/ConcertTable";

interface Concert {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  username: string;
}

interface HistoryRecord {
  id: number;
  user?: User; // optional, because backend might not always populate
  concert?: Concert; // same here
  status: "active" | "cancelled";
  action: string;
  updated_at: string;
}

interface ConcertTableRow {
  dateTime: string;
  username: string;
  concertName: string;
  action: string;
}

export default function UserHistoryPage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("user_id");
  const userId = userIdParam ? Number(userIdParam) : 1;

  // Fetch user history
  const { data = [], isLoading } = useQuery<HistoryRecord[]>({
    queryKey: ["history", userId],
    queryFn: async () =>
      (await api.get(`/history/by-user?user_id=${userId}`)).data,
    enabled: !!userId,
  });

  // Map API data to table format safely
  const formattedData: ConcertTableRow[] = data.map((r) => ({
    dateTime: new Date(r.updated_at).toLocaleString(),
    username: r.user?.username ?? "Unknown User",
    concertName: r.concert?.name ?? "Unknown Concert",
    action:
      r.status === "cancelled"
        ? "Cancelled"
        : r.action === "reserve"
        ? "Reserved"
        : "Reserved",
  }));

  return (
    <div className="flex flex-col gap-4">
      <ConcertTable
        data={formattedData}
        isLoading={isLoading}
        emptyMessage="No history found"
      />
    </div>
  );
}
