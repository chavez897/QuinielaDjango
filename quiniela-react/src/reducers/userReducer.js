import { types } from "../types/types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.saveUser:
      return {
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
        lastName: action.payload.lastName,
        secondLastName: action.payload.secondLastName,
        userprofile: {
          id: action.payload.userprofile.id,
          picture: action.payload.userprofile.picture,
          role: action.payload.userprofile.role,
        },
      };
    case types.deleteUser:
      return {};
    default:
      return state;
  }
};
