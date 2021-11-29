import React from "react";
import { TeamItem } from "../GamePredictions/TeamItem";
import { ScoreFormItem } from "./ScoreFormItem";

export const GameScoreItem = ({ game }) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-1">
          <TeamItem team={game.awayTeam} />
        </div>
        <div className="col-span-1">
          <TeamItem team={game.homeTeam} />
        </div>
        <div className="col-span-2 mt-2">
          <ScoreFormItem game={game} />
        </div>
      </div>
      <hr className="mt-4" />
    </div>
  );
};
