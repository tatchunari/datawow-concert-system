import { Save } from "lucide-react";
import Button from "../Button";
import InputBox from "../InputBox";

import { useState } from "react";

const CreateSection = () => {
  const [concertName, setConcertName] = useState("");
  const [totalSeats, setTotalSealts] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white p-5 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition">
      {/* Title */}
      <div className="border-b border-gray-300 py-3">
        <h2 className="font-roboto font-semibold text-3xl text-[#1692EC]">
          Create
        </h2>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row mt-4 gap-3">
          {/* Concert Name Input */}
          <InputBox
            label="Concert Name"
            placeholder="Please input concert name"
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
            required
          />
          <InputBox
            label="Total of seat"
            placeholder="Please input description"
            value={description}
            onChange={(e) => setTotalSealts(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <InputBox
            label="Description"
            placeholder="Please fill in number of seats"
            value={totalSeats}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5 flex justify-end">
        <Button
          label="Save"
          textColor="text-white"
          color="bg-[#1692EC]"
          onClick={() => {}}
          icon={Save}
          iconPosition="left"
        />
      </div>
    </div>
  );
};

export default CreateSection;
