import { types } from "../types/types";

export const selectedLeagueReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getSelectedLeagueInfo:
      return {
        id: action.payload.id,
        name: action.payload.name,
        slug: action.payload.slug,
        picture: action.payload.picture,
        isPublic: action.payload.isPublic,
        points: action.payload.points,
      };
    case types.deleteSelectedLeague:
      return {};
    default:
      return state;
  }
};
