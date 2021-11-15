import React, { useState } from "react";
import { LockIcon } from "../ui/Icons/LockIcon";
import { UserAddIcon } from "../ui/Icons/UserAddIcon";
import { LeagueEnrollmentModal } from "./LeagueEnrollmentModal";

export const FilterLeagueItem = (league) => {
  const [enrollment, setEnrollment] = useState(false);
  return (
    <>
      {enrollment ? (
        <LeagueEnrollmentModal setEnrollment={setEnrollment} league={league} />
      ) : null}
      <div className="px-4 py-2 bg-white shadow-lg rounded-lg w-full h-30 mr-8 border-4 border-light-blue-500 border-opacity-100 cursor-pointer">
        <div className="grid grid-cols-6 gap-1">
          <div className="col-span-1">
            <img
              className="w-16 h-16 object-cover rounded-full"
              alt="asdf"
              src={
                league.picture ??
                "https://www.pnguniverse.com/wp-content/uploads/2021/06/NFL-ball-62634748.png"
              }
            />
          </div>
          <div className="col-span-4 flex">
            <h2 className="text-gray-800 text-3xl font-semibold">
              {league.name}
            </h2>
            {!league.isPublic ? (
              <div className="mt-2 ml-2">
                <LockIcon className="mt-2" />
              </div>
            ) : null}
          </div>
          <div className="col-span-1 mt-3 ml-5">
            <div className="bg-green-400 text-sm leading-none rounded-full inline-flex ">
              <button
                className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none text-white rounded-l-full px-4 py-2 active"
                id="grid"
                onClick={() => {
                  setEnrollment(true);
                }}
              >
                <UserAddIcon />
                <span className="ml-1">Enroll</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
