import { types } from "../types/types";

export const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case types.getGames:
      return [...action.payload.predictions];
    case types.deleteGames:
      return [];
    case types.changeGameScore:
      const index = state.findIndex((game) => game.id === action.payload.id);
      if (action.payload.type === "homeScore") {
        state[index].homeScore = action.payload.points;
      } else if (action.payload.type === "awayScore") {
        state[index].awayScore = action.payload.points;
      }
      return state;
    default:
      return state;
  }
};
