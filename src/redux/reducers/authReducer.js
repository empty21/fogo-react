import { SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "../types";

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("r_token")),
  data: JSON.parse(localStorage.getItem("userInfo"))
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        data: JSON.parse(localStorage.getItem("userInfo"))
      }
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        data: null
      }
    default:
      return state;
  }
}