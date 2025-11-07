"use client";
import React from "react";

interface InputBoxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  className?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  className = "",
  required = false,
  multiline = false,
  rows = 4,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={`w-full border border-gray-400 rounded-md px-4 py-2 text-base resize-none outline-none focus:ring-2 focus:ring-[#1692EC] focus:border-[#1692EC] ${className}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border border-gray-400 rounded-md px-4 py-2 text-base outline-none focus:ring-2 focus:ring-[#1692EC] focus:border-[#1692EC] ${className}`}
        />
      )}
    </div>
  );
};

export default InputBox;
