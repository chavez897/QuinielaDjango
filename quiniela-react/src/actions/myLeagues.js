import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getMyLeagues = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/api/league/my-leagues/")
        .then((res) => {
          dispatch(getMyLeaguesAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getMyLeaguesAction = (res) => ({
  type: types.getMyLeagues,
  payload: {
    myLeagues: res,
  },
});

export const deleteMyLeaguesAction = () => ({
  type: types.deleteMyLeagues,
  payload: null,
});
