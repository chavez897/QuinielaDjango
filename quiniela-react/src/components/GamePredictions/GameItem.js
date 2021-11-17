import React, { useState } from "react";
import { GamePredictionItem } from "./GamePredictionItem";
import { TeamItem } from "./TeamItem";

export const GameItem = ({ game, scoreDifference }) => {
  const [prediction, setPrediction] = useState();
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-1">
          <TeamItem team={game.game.awayTeam} />
        </div>
        <div className="col-span-1">
          <TeamItem team={game.game.homeTeam} />
        </div>
        <div className="col-span-2 mt-2">
          <GamePredictionItem
            difference={scoreDifference}
            selected={prediction}
            setSelected={setPrediction}
            gameId={game.id}
          />
        </div>
      </div>
      <hr className="mt-4" />
    </div>
  );
};
