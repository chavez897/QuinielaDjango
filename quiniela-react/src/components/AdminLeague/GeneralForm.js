import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionGeneralConfigurationLeagueAction } from "../../actions/GeneralConfiguration";
import { AddIcon } from "../ui/Icons/AddIcon";
import { SwitchComponent } from "../ui/SwitchComponent";
import { GeneralQuestionItem } from "./GeneralQuestionItem";

export const GeneralForm = () => {
  const dispatch = useDispatch();
  const addQuestion = () => {
    dispatch(
      addQuestionGeneralConfigurationLeagueAction({
        id: new Date().valueOf(),
        question: "",
        answer: "",
        answerObject: {},
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
  console.log(general);
  return (
    <>
      {/* <SwitchComponent
        toggle={teamRe}
        setToggle={setTeamRecords}
        label="Team Records"
      /> */}
      {general.questions.map((item) => (
        <GeneralQuestionItem key={item.id} id={item.id} teams={teams} />
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
