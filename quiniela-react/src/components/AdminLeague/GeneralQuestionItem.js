import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  editGeneralConfigurationQuestionAction,
  removeQuestionGeneralConfigurationLeagueAction,
} from "../../actions/GeneralConfiguration";
import { useForm } from "../../hooks/useForm";
import { XCircle } from "../ui/Icons/XCircle";

export const GeneralQuestionItem = ({ question, teams }) => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    questionText: question.question,
  });
  const [answer, setAnswer] = useState();
  const { questionText } = formValues;
  useEffect(() => {
    const initialAnswer = teams.find((team) => team.value === question.answer);
    setAnswer(initialAnswer);
  }, [dispatch, question.answer, question.id, teams]);

  const handleAnswerChange = (selected) => {
    setAnswer(selected);
    dispatch(
      editGeneralConfigurationQuestionAction({
        id: question.id,
        answer: selected.value,
      })
    );
  };
  const handleQuestionChange = (e) => {
    handleInputChange(e);
    dispatch(
      editGeneralConfigurationQuestionAction({
        id: question.id,
        question: e.target.value,
      })
    );
  };
  const handleRemove = () => {
    dispatch(removeQuestionGeneralConfigurationLeagueAction(question.id));
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-11 md:col-span:23">
          <div className="mb-8 mt-5 grid grid-cols-10 gap-2 md:gap-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2 mr-5 col-span-2 md:col-span-1"
              htmlFor="question"
            >
              Question
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-8 md:col-span-9"
              id="questionText"
              type="text"
              placeholder="question"
              name="questionText"
              value={questionText}
              onChange={handleQuestionChange}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2 mr-5 col-span-2 md:col-span-1"
              htmlFor="name"
            >
              Team
            </label>
            <Select
              className="w-full max-h-8 col-span-8 md:col-span-9"
              options={teams}
              maxMenuHeight={200}
              placeholder="Team"
              value={answer}
              onChange={handleAnswerChange}
            />
          </div>
        </div>
        <div
          className="col-span-1 block mx-auto my-auto text-red-500"
          onClick={handleRemove}
        >
          <XCircle />
        </div>
      </div>
    </>
  );
};
