import { types } from "../types/types";

export const generalConfigurationLeagueReducer = (
  state = { records: true, questions: [] },
  action
) => {
  switch (action.type) {
    case types.getGeneralConfiguration:
      return {
        records: state.records,
        questions: [...action.payload.questions],
      };
    case types.deleteGeneralConfiguration:
      return { records: state.records, questions: [] };
    case types.editGeneralConfiguration:
      return {
        records: state.records,
        questions: state.questions.map((item) => {
          if (item.id === action.payload.id) {
            item.question = action.payload.question
              ? action.payload.question
              : item.question;
            item.answer = action.payload.answer
              ? action.payload.answer
              : item.answer;
            item.answerObject = action.payload.answerObject
              ? action.payload.answerObject
              : item.answerObject;
          }
          return item;
        }),
      };
    case types.addQuestionGeneralConfiguration:
      return {
        records: state.records,
        questions: [...state.questions, action.payload],
      };
    case types.removeQuestion:
      return {
        records: state.records,
        questions: state.questions.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
