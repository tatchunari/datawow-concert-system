"use client";

import React from "react";
import { UserRound } from "lucide-react";
import Button from "./Button";

interface ConcertCardProps {
  title: string;
  description: string;
  totalSeats: number;
  buttonLabel: string;
  buttonColor?: string;
  buttonIcon?: React.ElementType;
  onButtonClick?: () => void;
}

const ConcertCard: React.FC<ConcertCardProps> = ({
  title,
  description,
  totalSeats,
  buttonLabel,
  buttonColor = "bg-card-red",
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="bg-white p-5 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition max-w-[350px] md:max-w-[1100px] mx-4 md:mx-10">
      {/* Title */}
      <div className="border-b border-gray-300 py-3">
        <h2 className="font-roboto font-semibold text-xl text-[#1692EC]">
          {title}
        </h2>
      </div>

      {/* Description */}
      <div className="text-sm my-5 text-gray-700">
        <p>{description}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <UserRound className="w-4 h-4 text-gray-600" />
          <p className="text-gray-700">{totalSeats}</p>
        </div>

        <Button
          label={buttonLabel}
          color={buttonColor}
          icon={buttonIcon}
          iconPosition="left"
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
};

export default ConcertCard;
