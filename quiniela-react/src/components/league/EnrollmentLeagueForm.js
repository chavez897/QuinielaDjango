import React from "react";
import { PictureInput } from "../ui/PictureInput";

export const EnrollmentLeagueForm = ({
  isPrivate,
  handleInputChange,
  formValues,
  selectedPicture,
  setSelectedPicture,
}) => {
  const { teamName, enrollCode } = formValues;
  return (
    <div className="relative p-6 flex-auto">
      <div className=" grid grid-cols-2 gap-4">
        <div className="col-span-2 mb-2 md:mb-0 md:col-span-1 ">
          <PictureInput
            selectedPicture={selectedPicture}
            setSelectedPicture={setSelectedPicture}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4 flex">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2 mr-5"
              htmlFor="name"
            >
              Team
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Team"
              name="teamName"
              value={teamName}
              onChange={handleInputChange}
            />
          </div>
          {isPrivate ? (
            <div className=" my-4 flex">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2 mr-5"
                htmlFor="Code"
              >
                Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="code"
                type="password"
                placeholder="********"
                name="enrollCode"
                value={enrollCode}
                onChange={handleInputChange}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
