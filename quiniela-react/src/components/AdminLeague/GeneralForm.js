import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionGeneralConfigurationLeagueAction,
  getGeneralConfigurationLeagueAction,
} from "../../actions/GeneralConfiguration";
import { AddIcon } from "../ui/Icons/AddIcon";
import { GeneralQuestionItem } from "./GeneralQuestionItem";

export const GeneralForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getGeneralConfigurationLeagueAction([
        {
          id: new Date().valueOf(),
          question: "Mejor Ofensiva",
          answer: 1,
        },
      ])
    );
  }, [dispatch]);
  const addQuestion = () => {
    dispatch(
      addQuestionGeneralConfigurationLeagueAction({
        id: new Date().valueOf(),
        question: "",
        answer: "",
      })
    );
  };
  const teams = [
    { value: 1, label: "San Francisco 49ers" },
    { value: 2, label: "Dallas Cowboys" },
  ];
  const general = useSelector((state) => state.generalConfigurationLeague);
  const handleSave = () => {
    console.log(general);
  };
  return (
    <>
      <h4 className="text-gray-800 text-2xl font-semibold">General Round</h4>
      <hr />
      {general.questions.map((item) => (
        <GeneralQuestionItem key={item.id} question={item} teams={teams} />
      ))}
      <div className="w-full mt-3">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full block mx-auto w-16 h-16"
          onClick={addQuestion}
        >
          <div className="pl-0">
            <AddIcon />
          </div>
        </button>
      </div>
      <button
        className="w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed"
        type="submit"
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );
};
