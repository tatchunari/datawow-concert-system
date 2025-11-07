import ConcertCard from "../ConcertCard";
import { Trash2 } from "lucide-react";

const OverviewSection = () => {
  return (
    <div>
      <ConcertCard
        title="Concert Name 1"
        description="lorem"
        totalSeats={500}
        buttonLabel="Delete"
        buttonColor="bg-card-red"
        buttonIcon={Trash2}
        onButtonClick={() => alert('Deleted "Summer Beats Festival"!')}
      />
    </div>
  );
};

export default OverviewSection;
