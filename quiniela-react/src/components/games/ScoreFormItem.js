import React from "react";
import { useDispatch } from "react-redux";
import { changeGameScore } from "../../actions/games";
import { useForm } from "../../hooks/useForm";

export const ScoreFormItem = ({ game }) => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    awayScore: game.awayScore !== null ? game.awayScore : "",
    homeScore: game.homeScore !== null ? game.homeScore : "",
  });
  const { awayScore, homeScore } = formValues;
  const handleScoreChange = (e) => {
    handleInputChange({ target: e.target });
    dispatch(changeGameScore(e.target.name, game.id, e.target.value));
  };
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="col-span-1 block mx-auto">
        <div className="mb-4 flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="awayScore"
            type="number"
            placeholder="Score"
            name="awayScore"
            value={awayScore}
            onChange={handleScoreChange}
          />
        </div>
      </div>
      <div className="col-span-1 block mx-auto">
        <div className="mb-4 flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="homeScore"
            type="number"
            placeholder="Score"
            name="homeScore"
            value={homeScore}
            onChange={handleScoreChange}
          />
        </div>
      </div>
    </div>
  );
};
