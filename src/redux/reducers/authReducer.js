import { SET_UNAUTHENTICATED, SET_AUTHENTICATED} from "../types";
const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("r_token"))
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        data: action.payload,
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