import {CLEAR_UI, SET_LOADING} from "../types";

const initialState = {
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_UI:
      return {
        ...state,
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}