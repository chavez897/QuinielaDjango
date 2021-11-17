import React from "react";
import { useSelector } from "react-redux";
import { GameItem } from "./GameItem";

export const GamePredictionsScreen = () => {
  const leagueInfo = useSelector((state) => state.selectedLeague);
  const predictions = [
    {
      id: 4,
      enrollment: 1,
      game: {
        id: 1,
        homeTeam: {
          id: 1,
          city: "Arizona",
          name: "Cardinals",
          logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/17/Arizona.png",
        },
        awayTeam: {
          id: 2,
          city: "Ravens",
          name: "Baltimore",
          logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/17/baltimore-ravens-logo.png",
        },
        season: 2021,
        week: 11,
        homeScore: null,
        awayScore: null,
      },
      prediction: null,
      scored: false,
    },
    {
      id: 5,
      enrollment: 1,
      game: {
        id: 1,
        homeTeam: {
          id: 1,
          city: "Arizona",
          name: "Cardinals",
          logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/17/Arizona.png",
        },
        awayTeam: {
          id: 2,
          city: "Ravens",
          name: "Baltimore",
          logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/17/baltimore-ravens-logo.png",
        },
        season: 2021,
        week: 11,
        homeScore: null,
        awayScore: null,
      },
      prediction: null,
      scored: false,
    },
  ];
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
            game={prediction}
            scoreDifference={leagueInfo.points}
          />
        ))}
      </div>
    </div>
  );
};
