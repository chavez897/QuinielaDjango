import { types } from "../types/types";

export const currentWeekReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getWeek:
      return {
        season: action.payload.season,
        week: action.payload.week,
      };
    case types.deleteWeek:
      return {};
    default:
      return state;
  }
};
