"use client";
import React from "react";
import { X } from "lucide-react";
import Button from "./Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  concertName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  concertName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete?{" "}
          <span className="font-bold">&quot;{concertName}&quot;</span>.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            textColor="text-black"
            color="bg-white"
            onClick={onClose}
          />
          <Button
            label="Delete"
            textColor="text-white"
            color="bg-card-red"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
