import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";
import { deleteMyLeaguesAction } from "./myLeagues";
import { deleteUserAction } from "./user";
import { deleteSelectedLeagueAction } from "./selectedLeague";
import { deleteMyPredictionsAction } from "./predictions";
import { deleteStandingsAction } from "./standings";
import { deleteCurrentWeekAction } from "./currentWeek";

export const login = (email, password) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/api/auth/token/", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(loginAction(res.data.access, res.data.refresh));
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          resolve(res);
        })
        .catch((error) => {
          reject(error.response.data.errors);
        });
    });
  };
};

export const refresh = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/api/auth/token/refresh/", {
          refresh: getState().tokens.refresh,
        })
        .then((res) => {
          dispatch(refreshAction(res.data));
          localStorage.setItem("access", res.data.access);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logoutAction());
    dispatch(deleteMyLeaguesAction());
    dispatch(deleteUserAction());
    dispatch(deleteSelectedLeagueAction());
    dispatch(deleteMyPredictionsAction());
    dispatch(deleteStandingsAction());
    dispatch(deleteCurrentWeekAction());
  };
};

export const refreshAction = (res) => ({
  type: types.refreshTokens,
  payload: {
    access: res.access,
  },
});

export const loginAction = (access, refresh) => ({
  type: types.saveTokens,
  payload: {
    access: access,
    refresh: refresh,
  },
});

export const logoutAction = () => ({
  type: types.deleteTokens,
});
