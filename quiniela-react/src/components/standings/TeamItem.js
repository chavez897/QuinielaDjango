import React from "react";

export const TeamItem = ({ team }) => {
  return (
    <tr className="text-gray-700 standings-row">
      <td className="px-4 py-3 border w-full">
        <div className="flex items-center text-sm w-full">
          <div>
            <p className="font-semibold text-black pr-3">{team.place}</p>
          </div>
          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={team.teamPicture}
              alt=""
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold text-black">{team.teamName}</p>
          </div>
        </div>
      </td>
    </tr>
  );
};
