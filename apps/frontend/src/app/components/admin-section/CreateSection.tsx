"use client";

import { Save, UserRound } from "lucide-react";
import Button from "../Button";
import InputBox from "../InputBox";
import { useState } from "react";

interface CreateSectionProps {
  onSave: (name: string, description: string, totalSeats: number) => void;
}

interface FormErrors {
  concertName?: string;
  totalSeats?: string;
  description?: string;
}
const CreateSection = ({ onSave }: CreateSectionProps) => {
  const [form, setForm] = useState({
    concertName: "",
    totalSeats: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear the error for this field if it exists
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    const newErrors: FormErrors = {};
    let hasError = false;

    // Concert Name validation
    if (!form.concertName.trim()) {
      newErrors.concertName = "Concert name is required";
      hasError = true;
    } else if (form.concertName.length < 3) {
      newErrors.concertName = "Concert name must be at least 3 characters";
      hasError = true;
    } else if (form.concertName.length > 50) {
      newErrors.concertName = "Concert name must be less than 50 characters";
      hasError = true;
    }

    // Total Seats validation
    const seats = Number(form.totalSeats);
    if (!form.totalSeats.trim()) {
      newErrors.totalSeats = "Total seats is required";
      hasError = true;
    } else if (isNaN(seats) || seats <= 0) {
      newErrors.totalSeats = "Total seats must be a positive number";
      hasError = true;
    } else if (seats > 1000) {
      newErrors.totalSeats = "Total seats cannot exceed 1000";
      hasError = true;
    }

    // Description validation
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      hasError = true;
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      hasError = true;
    } else if (form.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;
    // Call onSave with the validated values
    onSave(form.concertName.trim(), form.description.trim(), seats);

    // Reset the form after save
    setForm({
      concertName: "",
      totalSeats: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-[350px] md:max-w-[1100px] bg-white p-4 sm:p-5 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition mx-4 md:mx-10">
      {/* Title */}
      <div className="border-b border-gray-300 py-3">
        <h2 className="font-roboto font-semibold text-2xl sm:text-3xl text-[#1692EC]">
          Create
        </h2>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col sm:flex-row mt-4 gap-3">
          {/* Concert Name Input */}
          <div className="flex flex-col w-full">
            <InputBox
              label="Concert Name"
              placeholder="Please input concert name"
              value={form.concertName}
              onChange={(e) => handleChange("concertName", e.target.value)}
              required
            />
            {errors.concertName && (
              <p className="text-red-500 text-sm mt-1">{errors.concertName}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-row relative">
              <InputBox
                label="Total of seat"
                placeholder="Please fill in number of seats"
                value={form.totalSeats}
                onChange={(e) => handleChange("totalSeats", e.target.value)}
                required
              />
              <UserRound className="absolute top-9 right-4" />
            </div>
            {errors.totalSeats && (
              <p className="text-red-500 text-sm mt-1">{errors.totalSeats}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <InputBox
            label="Description"
            placeholder="Please enter description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            multiline
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5 flex justify-end">
        <Button
          label="Save"
          textColor="text-white"
          color="bg-[#1692EC]"
          onClick={handleSave}
          icon={Save}
          iconPosition="left"
        />
      </div>
    </div>
  );
};

export default CreateSection;
