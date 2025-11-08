"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import axios from "axios";

import ConcertCard from "../ConcertCard";
import DeleteModal from "../DeleteModal";
import { Trash2 } from "lucide-react";

interface OverviewSectionProps {
  onSelectConcert: (concert: {
    id: number;
    name: string;
    total_seats: number;
    available_seats: number;
    reserved_seats: number;
    cancelled_seats: number;
  }) => void;
}
export interface Concert {
  id: number;
  name: string;
  description: string;
  total_seats: number;
  available_seats: number;
  reserved_seats: number;
  cancelled_seats: number;
  status: string;
}

export function useConcerts() {
  return useQuery<Concert[]>({
    queryKey: ["concerts"],
    queryFn: async () => {
      const response = await api.get("/concerts");
      return response.data;
    },
  });
}

const OverviewSection = ({ onSelectConcert }: OverviewSectionProps) => {
  const { data: concerts = [], isLoading, isError } = useConcerts();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [selectedConcertId, setSelectedConcertId] = useState<number | null>(
    null
  );

  const handleDelete = async (concertId: number | null) => {
    try {
      // Call backend to deactivate the concert
      await axios.delete(`http://localhost:3001/concerts/${concertId}/`);

      // Close the modal
      setShowModal(false);
      // Invalidate the 'concerts' query so it refetches the latest list
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    } catch (error) {
      console.error("Failed to delete concert:", error);
      alert("Failed to delete concert. Please try again.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading concerts...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load concerts. Please try again.
      </p>
    );
  }

  return (
    <div>
      {concerts.map((concert) => (
        <ConcertCard
          key={concert.id}
          title={concert.name}
          description={concert.description}
          totalSeats={concert.available_seats}
          buttonLabel="Delete"
          buttonColor="bg-card-red"
          buttonIcon={Trash2}
          onButtonClick={() => {
            setShowModal(true);
            setSelectedConcertId(concert.id);
          }}
          onClick={() =>
            onSelectConcert({
              ...concert,
              total_seats: concert.total_seats,
            })
          }
        />
      ))}

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(selectedConcertId)}
        title="Delete Concert"
        concertName="Concert Name 1"
      />
    </div>
  );
};

export default OverviewSection;
