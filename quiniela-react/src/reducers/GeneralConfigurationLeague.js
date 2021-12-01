import { types } from "../types/types";

export const generalConfigurationLeagueReducer = (
  state = { records: true, questions: [] },
  action
) => {
  switch (action.type) {
    case types.getGeneralConfiguration:
      return {
        records: true,
        questions: [],
      };
    case types.deleteGeneralConfiguration:
      return { records: true, questions: [] };
    case types.editGeneralConfiguration:
      return { records: true, questions: [] };
    default:
      return state;
  }
};
