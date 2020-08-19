import { SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "../types";

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("r_token")),
  userState: null
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      }
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state;
  }
}