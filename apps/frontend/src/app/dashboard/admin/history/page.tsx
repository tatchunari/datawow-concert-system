"use client";

import ConcertTable from "@/app/components/ConcertTable";
import { useFetch } from "@/hooks/useFetch";
import { fetchHistory, HistoryRow } from "@/lib/historyService";

function useHistory() {
  return useFetch<HistoryRow[]>("history", fetchHistory);
}

const AdminHistoryPage = () => {
  const { data, isLoading } = useHistory();

  return (
    <ConcertTable
      data={data || []}
      isLoading={isLoading}
      emptyMessage="No history records found"
    />
  );
};

export default AdminHistoryPage;
