import { types } from "../types/types";

export const standingsReducer = (state = [], action) => {
  switch (action.type) {
    case types.getStandings:
      return [...action.payload];
    case types.deleteStandings:
      return [];
    default:
      return state;
  }
};
