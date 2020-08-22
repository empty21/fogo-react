import {SET_LOADING, CLEAR_UI} from "../types";

export const setLoading = () => dispatch => {
  return {
    type: SET_LOADING
  }
}
export const clearUi = () => dispatch => {
  return {
    type: CLEAR_UI
  };
}