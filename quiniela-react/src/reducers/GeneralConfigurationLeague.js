import { types } from "../types/types";

export const generalConfigurationLeagueReducer = (
  state = { records: true, questions: [] },
  action
) => {
  switch (action.type) {
    case types.getGeneralConfiguration:
      return {
        records: true,
        questions: [...action.payload.questions],
      };
    case types.deleteGeneralConfiguration:
      return { records: true, questions: [] };
    case types.editGeneralConfiguration:
      const index = state.questions.findIndex((question) => {
        return question.id === action.payload.id;
      });
      if (state.questions[index]) {
        state.questions[index].question = action.payload.question
          ? action.payload.question
          : state.questions[index].question;
        state.questions[index].answer = action.payload.answer
          ? action.payload.answer
          : state.questions[index].answer;
        state.questions[index].answerObject = action.payload.answerObject
          ? action.payload.answerObject
          : state.questions[index].answerObject;
      }
      return state;
    case types.addQuestionGeneralConfiguration:
      return {
        records: true,
        questions: [...state.questions, action.payload],
      };
    default:
      return state;
  }
};
