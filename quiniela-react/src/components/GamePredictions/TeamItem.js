import React from "react";

export const TeamItem = ({ team }) => {
  return (
    <div className="grid grid-rows-4 grid-flow-col gap-3">
      <div className="row-span-3 block mx-auto">
        <img className="h-24" src={team.logo} alt={team.name} />
      </div>
      <div className="row-span-1 text-center font-bold">
        {team.city} {team.name}
      </div>
    </div>
  );
};
