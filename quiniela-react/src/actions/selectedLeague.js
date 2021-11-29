import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getSelectedLeagueInfo = (slug) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/api/league/${slug}/`)
        .then((res) => {
          dispatch(getSelectedLeagueInfoAction(res.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export const getSelectedLeagueInfoAction = (res) => ({
  type: types.getSelectedLeagueInfo,
  payload: {
    id: res.id,
    name: res.name,
    slug: res.slug,
    picture: res.picture,
    isPublic: res.isPublic,
    points: 6,
  },
});

export const deleteSelectedLeagueAction = () => ({
  type: types.deleteSelectedLeague,
  payload: null,
});
