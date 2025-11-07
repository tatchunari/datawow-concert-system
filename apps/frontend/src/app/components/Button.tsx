"use client";

import React from "react";

interface ButtonProps {
  label: string;
  color?: string;
  textColor?: string;
  onClick?: () => void;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = "bg-[#1692EC]",
  textColor = "text-white",
  onClick,
  icon: Icon,
  iconPosition = "left",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${color} ${textColor}
        flex items-center justify-center gap-2
        font-roboto
        px-4 py-2 rounded-md
        hover:opacity-90 transition
      `}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      <span>{label}</span>
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;
