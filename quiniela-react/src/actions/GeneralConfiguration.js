import { types } from "../types/types";
import { axiosInstance } from "../plugins/axios";

export const getGeneralConfigurationLeagueAction = (res) => ({
  type: types.getGeneralConfiguration,
  payload: {
    questions: res,
  },
});
