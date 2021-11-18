import { types } from "../types/types";

export const predictionsReducer = (state = [], action) => {
  switch (action.type) {
    case types.getMyPredictions:
      return [...action.payload.predictions];
    case types.deleteMyPredictinos:
      return [];
    case types.predictGame:
      const index = state.findIndex(
        (prediction) => prediction.id === action.payload.id
      );
      state[index].prediction = action.payload.prediction;
      return state;
    default:
      return state;
  }
};
