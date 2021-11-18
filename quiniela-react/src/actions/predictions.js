import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getMyPredictions = (idLeague) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/api/game-predictions/current-week/", {
          idLeague: idLeague,
        })
        .then((res) => {
          dispatch(getMyPredictinosAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const predictGameAction = (id, prediction) => ({
  type: types.predictGame,
  payload: {
    id: id,
    prediction: prediction,
  },
});

export const getMyPredictinosAction = (res) => ({
  type: types.getMyPredictions,
  payload: {
    predictions: res.predictions,
  },
});

export const deleteMyPredictionsAction = () => ({
  type: types.deleteMyPredictinos,
  payload: null,
});
