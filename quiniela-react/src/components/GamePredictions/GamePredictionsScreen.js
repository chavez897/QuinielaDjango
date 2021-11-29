import React, { useState } from "react";
import { useSelector } from "react-redux";
import { saveMyPredictions } from "../../actions/predictions";
import { ErrorModal } from "../ui/ErrorModal";
import { LoadingModal } from "../ui/LoadingModal";
import { SuccessModal } from "../ui/SuccessModal";
import { GameItem } from "./GameItem";

export const GamePredictionsScreen = () => {
  const predictions = useSelector((state) => state.predictions);
  const leagueInfo = useSelector((state) => state.selectedLeague);
  const currentWeek = useSelector((state) => state.currentWeek);
  const [saving, setSaving] = useState(false);
  const [succesfull, setSuccesfull] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleSave = () => {
    setSaving(true);
    let sendPredicitons = [];
    predictions.forEach((element) => {
      sendPredicitons.push({
        id: element.id,
        prediction: element.prediction,
      });
    });
    const data = {
      idLeague: leagueInfo.id,
      predictions: sendPredicitons,
    };
    saveMyPredictions(data)
      .then(() => {
        setSaving(false);
        setModalMessage("Predictions saved. Good Luck!");
        setSuccesfull(true);
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
