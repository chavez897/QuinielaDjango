import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getUserData = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/api/users/me/")
        .then((res) => {
          dispatch(getUserDataAction(res.data));
          console.log(res.data.userprofile.picture);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getUserDataAction = (res) => ({
  type: types.saveUser,
  payload: {
    id: res.id,
    username: res.username,
    name: res.name,
    lastName: res.lastName,
    secondLastName: res.secondLastName,
    userprofile: {
      id: res.userprofile.id,
      picture: res.userprofile.picture,
      role: res.userprofile.role,
    },
  },
});
