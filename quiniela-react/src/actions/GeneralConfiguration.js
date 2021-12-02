import { types } from "../types/types";

export const getGeneralConfigurationLeagueAction = (res) => ({
  type: types.getGeneralConfiguration,
  payload: {
    questions: res,
  },
});

export const addQuestionGeneralConfigurationLeagueAction = (data) => ({
  type: types.addQuestionGeneralConfiguration,
  payload: data,
});

export const editGeneralConfigurationQuestionAction = (data) => ({
  type: types.editGeneralConfiguration,
  payload: data,
});
