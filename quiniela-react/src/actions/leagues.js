import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const searchLeagues = (search) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/api/league/?search=${search}`)
        .then((res) => {
          dispatch(searchLeaguesAction(res.data.results));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const searchLeaguesAction = (res) => ({
  type: types.searchLeagues,
  payload: res,
});
