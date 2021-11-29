import { types } from "../types/types";

export const myLeagueReducer = (state = [], action) => {
  switch (action.type) {
    case types.getMyLeagues:
      return [...action.payload.myLeagues];
    case types.deleteMyLeagues:
      return [];
    default:
      return state;
  }
};
