import StatCard from "@/app/components/Statcard";
import { UserRound, Award, CircleX } from "lucide-react";

interface StatSectionProps {
  selectedConcert: {
    id: number;
    name: string;
    total_seats: number;
    available_seats: number;
    reserved_seats: number;
    cancelled_seats: number;
  } | null;
}

const StatSection = ({ selectedConcert }: StatSectionProps) => {
  if (!selectedConcert) {
    return (
      <div className="text-center text-gray-500 py-10">
        Select a concert to view statistics
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
        <StatCard
          icon={<UserRound className="w-10 h-10" />}
          label="Total Seats"
          value={selectedConcert.total_seats}
          color="bg-card-blue"
        />
        <StatCard
          icon={<Award className="w-10 h-10" />}
          label="Reserved"
          value={selectedConcert.reserved_seats}
          color="bg-card-green"
        />
        <StatCard
          icon={<CircleX className="w-10 h-10" />}
          label="Cancelled"
          value={selectedConcert.cancelled_seats}
          color="bg-card-red"
        />
      </div>
    </div>
  );
};

export default StatSection;
