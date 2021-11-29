import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const saveGames = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/api/games/save-scores/", { games: data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getGames = (season, week) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/api/games/?season=${season}&week=${week}`)
        .then((res) => {
          dispatch(getGamessAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const changeGameScore = (type, id, points) => ({
  type: types.changeGameScore,
  payload: {
    type: type,
    id: id,
    points: points,
  },
});

export const getGamessAction = (res) => ({
  type: types.getGames,
  payload: {
    predictions: res.results.reverse(),
  },
});

export const deleteGamesAction = () => ({
  type: types.deleteGames,
  payload: null,
});
