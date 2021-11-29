import React from "react";
import { useForm } from "../../hooks/useForm";

export const ScoreFormItem = () => {
  const [formValues, handleInputChange] = useForm({
    awayScore: "",
    homeCode: "",
  });
  const { awayScore, homeScore } = formValues;
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="col-span-1 block mx-auto">
        <div className="mb-4 flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="awayScore"
            type="number"
            placeholder="Score"
            name="awayScore"
            value={awayScore}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="col-span-1 block mx-auto">
        <div className="mb-4 flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="homeScore"
            type="number"
            placeholder="Score"
            name="homeScore"
            value={homeScore}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
