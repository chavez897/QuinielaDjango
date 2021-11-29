import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getCurrentWeek = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/api/current-week/1/`)
        .then((res) => {
          dispatch(getCurrentWeekAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getCurrentWeekAction = (res) => ({
  type: types.getWeek,
  payload: {
    season: res.season,
    week: res.week,
  },
});

export const deleteCurrentWeekAction = () => ({
  type: types.deleteWeek,
  payload: null,
});
