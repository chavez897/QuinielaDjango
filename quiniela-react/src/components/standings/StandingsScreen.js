import React from "react";
import { PointsColumns } from "./PointsColumns";
import { TeamColumn } from "./TeamColumn";

export const StandingsScreen = () => {
  return (
    <div className="flex">
      <div className="p-6 block grid grid-cols-6 gap-0 w-full">
        <div className="col-span-3 md:col-span-1">
          <TeamColumn />
        </div>
        <div className="col-span-3 md:col-span-5">
          <PointsColumns />
        </div>
      </div>
    </div>
  );
};
