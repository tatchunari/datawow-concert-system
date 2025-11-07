"use client";

import ConcertCard from "@/app/components/ConcertCard";
import DeleteModal from "@/app/components/DeleteModal";

import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function UserDashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };
  return (
    <div className="flex flex-col gap-4">
      <ConcertCard
        title="Concert Name 1"
        description="lorem"
        totalSeats={500}
        buttonLabel="Delete"
        buttonColor="bg-card-red"
        buttonIcon={Trash2}
        onButtonClick={handleDelete}
      />
      <ConcertCard
        title="Concert Name 2"
        description="lorem"
        totalSeats={2000}
        buttonLabel="Reserve"
        buttonColor="bg-[#1692EC]"
        onButtonClick={() => alert("You reserved a seat!")}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Concert"
        concertName="Concert Name 1"
      />
    </div>
  );
}
