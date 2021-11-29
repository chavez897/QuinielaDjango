import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, saveGames } from "../../actions/games";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames(currentWeek.season, currentWeek.week));
  }, [currentWeek.season, currentWeek.week, dispatch]);
  const games = useSelector((state) => state.games);

  const handleSave = () => {
    setSaving(true);
    const data = [];
    games.forEach((game) => {
      if (game.homeScore && game.awayScore) {
        data.push({
          id: game.id,
          homeScore: game.homeScore,
          awayScore: game.awayScore,
        });
      }
    });
    saveGames(data)
      .then(() => {
        setSaving(false);
        setSuccesfull(true);
        setModalMessage("Scores Saved!");
      })
      .catch((error) => {
        setSaving(false);
        setModalMessage(
          error.length <= 0 ? "Error please try again" : error[0].message
        );
        setError(true);
      });
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
          className="w-full mt-5 mb-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed"
          type="submit"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
