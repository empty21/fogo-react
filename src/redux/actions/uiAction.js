import {SET_LOADING, CLEAR_UI} from "../types";

export function setLoading() {
  return {
    type: SET_LOADING
  }
}
export function clearUi() {
  return {
    type: CLEAR_UI
  }
}