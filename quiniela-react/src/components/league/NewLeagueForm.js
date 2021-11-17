import React from "react";
import { PictureInput } from "../ui/PictureInput";
import { SwitchComponent } from "../ui/SwitchComponent";

export const NewLeagueForm = ({
  isPrivate,
  setIsPrivate,
  handleInputChange,
  formValues,
  selectedPicture,
  setSelectedPicture,
}) => {
  const { name, code } = formValues;
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
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <SwitchComponent
            toggle={isPrivate}
            setToggle={setIsPrivate}
            label="Private"
          />
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
                name="code"
                value={code}
                onChange={handleInputChange}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
