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

export const createLeague = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/api/league/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response.data.errors);
      });
  });
};

export const enrollLeague = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/api/league/enroll-league/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response.data.errors);
      });
  });
};

export const searchLeaguesAction = (res) => ({
  type: types.searchLeagues,
  payload: res,
});
