import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getStandings = (league) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/api/points/standings/?league=${league}`)
        .then((res) => {
          dispatch(getStandingsAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getStandingsAction = (standings) => ({
  type: types.getStandings,
  payload: standings,
});

export const deleteStandingsAction = (res) => ({
  type: types.deleteStandings,
  payload: null,
});
