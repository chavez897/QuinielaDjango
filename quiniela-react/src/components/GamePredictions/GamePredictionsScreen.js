import React from "react";
import { useSelector } from "react-redux";
import { GameItem } from "./GameItem";

export const GamePredictionsScreen = () => {
  const predictions = useSelector((state) => state.predictions);
  const leagueInfo = useSelector((state) => state.selectedLeague);
  const handleSave = () => {
    console.log(predictions);
  };

  return (
    <div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="col-span-1 text-right text-3xl font-bold">
          Season: 2021
        </div>
        <div className="col-span-1 text-left text-3xl font-bold">Week: 11</div>
      </div>
      <div className="mt-8">
        {predictions.map((prediction) => (
          <GameItem
            key={prediction.id}
            prediction={prediction}
            scoreDifference={leagueInfo.points}
          />
        ))}
        <button
          className="w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed"
          type="submit"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
