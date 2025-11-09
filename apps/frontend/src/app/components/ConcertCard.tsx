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
  onClick?: () => void;
  isSelected?: boolean;
}

const ConcertCard: React.FC<ConcertCardProps> = ({
  title,
  description,
  totalSeats,
  buttonLabel,
  buttonColor = "bg-card-red",
  buttonIcon,
  onButtonClick,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      className={`cursor-pointer bg-white p-5 border rounded-md shadow-sm transition max-w-[350px] md:max-w-[1100px] mx-4 md:mx-10 my-4
        ${
          isSelected
            ? "border-[#1692EC] shadow-md bg-blue-50"
            : "border-gray-300 hover:shadow-md"
        }`}
      onClick={onClick}
    >
      {/* Title */}
      <div className="border-b border-gray-300 py-3">
        <h2
          className={`font-roboto font-semibold text-xl ${
            isSelected ? "text-[#1692EC]" : "text-gray-800"
          }`}
        >
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
