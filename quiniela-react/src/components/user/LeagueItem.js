import React from "react";
import { useHistory } from "react-router";
import { SettingsIcon } from "../ui/Icons/SettingsIcon";

export const LeagueItem = (team) => {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/league/${team.leagueInfo.slug}`,
    });
  };
  const handleClickSettings = () => {
    history.push({
      pathname: `/admin-league/${team.leagueInfo.slug}`,
    });
  };
  return (
    <div className="px-4 py-2 bg-white shadow-lg rounded-lg w-full h-30 mr-8 border-4 border-light-blue-500 border-opacity-100 cursor-pointer">
      <div className="grid grid-cols-6 gap-1">
        <div className="col-span-1 hidden md:block" onClick={handleClick}>
          <img
            className="w-16 h-16 object-cover rounded-full"
            alt="asdf"
            src={
              team.teamPicture ??
              "https://www.pnguniverse.com/wp-content/uploads/2021/06/NFL-ball-62634748.png"
            }
          />
        </div>
        <div className="col-span-4" onClick={handleClick}>
          <h2 className="text-gray-800 text-3xl font-semibold">
            {team.teamName}
          </h2>
          <small className="mt-2 text-gray-600">{team.leagueInfo.name}</small>
        </div>
        <div
          className="col-span-2 md:col-span-1 h-full py-5 ml-auto"
          onClick={handleClickSettings}
        >
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};
