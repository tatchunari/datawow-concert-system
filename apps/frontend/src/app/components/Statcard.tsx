import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const StatCard = ({
  icon,
  label,
  value,
  color = "bg-card-blue",
}: StatCardProps) => {
  return (
    <div
      className={`w-[350px] h-[234px] flex justify-center items-center rounded-lg ${color}`}
    >
      <div className="flex flex-col gap-y-5 items-center justify-center">
        <div className="text-white w-10 h-10">{icon}</div>
        <p className="text-white text-xl">{label}</p>
        <p className="text-white text-5xl">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
