import { useState } from "react";
import ConcertCard from "../ConcertCard";
import DeleteModal from "../DeleteModal";
import { Trash2 } from "lucide-react";

const OverviewSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };
  return (
    <div>
      <ConcertCard
        title="Concert Name 1"
        description="lorem"
        totalSeats={500}
        buttonLabel="Delete"
        buttonColor="bg-card-red"
        buttonIcon={Trash2}
        onButtonClick={handleDelete}
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
};

export default OverviewSection;
