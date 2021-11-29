import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ErrorModal } from "../ui/ErrorModal";
import { LoadingModal } from "../ui/LoadingModal";
import { SuccessModal } from "../ui/SuccessModal";
import { GameScoreItem } from "./GameScoreItem";

export const GamesScreen = () => {
  const currentWeek = useSelector((state) => state.currentWeek);
  const [saving, setSaving] = useState(false);
  const [succesfull, setSuccesfull] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const games = [
    {
      id: 14,
      homeTeam: {
        id: 22,
        city: "Los Angeles",
        name: "Chargers",
        logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/18/los-angeles-chargers-logo-2.png",
      },
      awayTeam: {
        id: 30,
        city: "Pittsburgh",
        name: "Steelers",
        logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/18/768px-Pittsburgh_Steelers_logo.svg.png",
      },
      season: 2021,
      week: 11,
      date: "2021-11-23T19:20",
      homeScore: 35,
      awayScore: 5,
    },
    {
      id: 13,
      homeTeam: {
        id: 18,
        city: "Kansas City",
        name: "Chiefs",
        logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/18/kansas-city-chiefs-logo.png",
      },
      awayTeam: {
        id: 9,
        city: "Dallas",
        name: "Cowboys",
        logo: "http://localhost:8000/media/nfl_teams/logo/2021/11/18/Dallas_Cowboys.svg.png",
      },
      season: 2021,
      week: 11,
      date: "2021-11-22T15:25",
      homeScore: null,
      awayScore: null,
    },
  ];

  const handleSave = () => {
    console.log("save");
  };
  return (
    <div>
      {saving && <LoadingModal />}
      {succesfull ? (
        <SuccessModal
          message={modalMessage}
          close={() => {
            setSuccesfull(false);
          }}
        />
      ) : null}
      {error ? (
        <ErrorModal
          message={modalMessage}
          close={() => {
            setError(false);
          }}
        />
      ) : null}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="col-span-1 text-right text-3xl font-bold">
          Season: {currentWeek.season}
        </div>
        <div className="col-span-1 text-left text-3xl font-bold">
          Week: {currentWeek.week}
        </div>
      </div>
      <div className="mt-8">
        {games.map((game) => (
          <GameScoreItem key={game.id} game={game} />
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
