import React from "react";
import { GamePredictionItem } from "./GamePredictionItem";
import { TeamItem } from "./TeamItem";

export const GameItem = ({ prediction, scoreDifference }) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-1">
          <TeamItem team={prediction.game.awayTeam} />
        </div>
        <div className="col-span-1">
          <TeamItem team={prediction.game.homeTeam} />
        </div>
        <div className="col-span-2 mt-2">
          <GamePredictionItem
            difference={scoreDifference}
            prediction={prediction}
          />
        </div>
      </div>
      <hr className="mt-4" />
    </div>
  );
};
