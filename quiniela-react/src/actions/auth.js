import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const login = (email, password) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/api/auth/token/", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(loginAction(res.data));
          localStorage.setItem("tokens", JSON.stringify(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const loginAction = (res) => ({
  type: types.saveTokens,
  payload: {
    access: res.access,
    refresh: res.refresh,
  },
});
