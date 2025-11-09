"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
import { api } from "@/lib/axios";
import ConcertCard from "@/app/components/ConcertCard";
// import DeleteModal from "@/app/components/DeleteModal";

interface Concert {
  id: number;
  name: string;
  description: string;
  total_seats: number;
  available_seats: number;
  reserved_seats: number;
  cancelled_seats: number;
}

interface Reservation {
  id: number;
  user: {
    id: number;
    username: string;
  };
  concert: Concert;
  status: "active" | "cancelled";
}

export default function UserDashboardPage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("user_id");
  const userId = userIdParam ? Number(userIdParam) : 1; // default to 1

  const queryClient = useQueryClient();
  // const [showModal, setShowModal] = useState(false);
  // const [selectedConcertId, setSelectedConcertId] = useState<number | null>(
  //   null
  // );

  // Fetch concerts
  const { data: concerts = [], isLoading: concertsLoading } = useQuery<
    Concert[]
  >({
    queryKey: ["concerts"],
    queryFn: async () => (await api.get("/concerts")).data,
  });

  // Fetch user reservations
  const { data: reservations = [], isLoading: reservationsLoading } = useQuery<
    Reservation[]
  >({
    queryKey: ["reservations", userId],
    queryFn: async () => (await api.get(`/reservations/user/${userId}`)).data,
    enabled: !!userId,
  });

  // Mutations
  const reserveMutation = useMutation({
    mutationFn: (concertId: number) =>
      api.post("/reservations/reserve", {
        user_id: userId,
        concert_id: concertId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["reservations", userId] });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (concertId: number) =>
      api.post("/reservations/cancel", {
        user_id: userId,
        concert_id: concertId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["reservations", userId] });
    },
  });

  if (concertsLoading || reservationsLoading)
    return <p className="text-center mt-10">Loading...</p>;

  const handleReserveCancel = (concertId: number, hasReserved: boolean) => {
    if (hasReserved) cancelMutation.mutate(concertId);
    else reserveMutation.mutate(concertId);
  };

  return (
    <div className="flex flex-col gap-4">
      {concerts.map((concert) => {
        const hasReserved = reservations.some(
          (r) => r.concert.id === concert.id && r.status === "active"
        );

        return (
          <ConcertCard
            key={concert.id}
            title={concert.name}
            description={concert.description}
            totalSeats={concert.total_seats}
            buttonLabel={hasReserved ? "Cancel" : "Reserve"}
            buttonColor={hasReserved ? "bg-card-red" : "bg-[#1692EC]"}
            onButtonClick={() => handleReserveCancel(concert.id, hasReserved)}
          />
        );
      })}
    </div>
  );
}
