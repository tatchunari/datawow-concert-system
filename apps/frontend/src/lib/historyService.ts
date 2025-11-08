import { api } from "./axios";

export interface HistoryEntity {
  id: number;
  user: {
    id: number;
    username: string;
  };
  concert: {
    id: number;
    name: string;
  };
  action: "reserve" | "cancel";
  updated_at: string; // ISO string
}
export interface HistoryRow {
  dateTime: string; // formatted updated_at
  username: string;
  concertName: string;
  action: string; // 'Reserve' | 'Cancel'
}

export async function fetchHistory(): Promise<HistoryRow[]> {
  const res = await api.get<HistoryEntity[]>("/history"); // typed response

  return res.data.map((item) => ({
    dateTime: new Date(item.updated_at).toLocaleString(),
    username: item.user.username,
    concertName: item.concert.name,
    action: item.action.charAt(0).toUpperCase() + item.action.slice(1),
  }));
}
