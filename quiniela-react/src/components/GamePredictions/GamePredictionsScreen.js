import React from "react";
import { GameItem } from "./GameItem";

export const GamePredictionsScreen = () => {
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
      <div className="mt-8">
        {predictions.map((prediction) => (
          <GameItem key={prediction.id} game={prediction} scoreDifference={6} />
        ))}
      </div>
    </div>
  );
};
