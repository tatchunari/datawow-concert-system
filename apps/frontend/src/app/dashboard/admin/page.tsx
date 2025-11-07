import StatCard from "@/app/components/Statcard";

// Icons
import { UserRound } from "lucide-react";
import { Award } from "lucide-react";
import { CircleX } from "lucide-react";
export default function AdminDashboardPage() {
  return (
    <div>
      {/* Stats Card Section */}
      <div className="flex flex-row gap-x-5">
        <StatCard
          icon={<UserRound className="w-10 h-10" />}
          label="Total of seats"
          value={500}
          color="bg-card-blue"
        />
        <StatCard
          icon={<Award className="w-10 h-10" />}
          label="Reserve"
          value={120}
          color="bg-card-green"
        />
        <StatCard
          icon={<CircleX className="w-10 h-10" />}
          label="Cancel"
          value={12}
          color="bg-card-red"
        />
      </div>
    </div>
  );
}
