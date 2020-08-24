import {SET_LOADING, CLEAR_UI} from "../types";

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}
export const clearUi = () => {
  return {
    type: CLEAR_UI
  };
}