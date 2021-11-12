import { types } from "../types/types";

export const leaguesReducer = (state = [], action) => {
  switch (action.type) {
    case types.searchLeagues:
      return [...action.payload];
    case types.deleteMyLeagues:
      return [];
    default:
      return state;
  }
};
