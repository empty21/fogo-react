import {CLEAR_UI, SET_LOADING, SET_NEXT_PAGE} from "../types";

const initialState = {
  loading: false,
  nextPage: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_UI:
      return {
        ...state,
        loading: false,
        nextPage: null
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_NEXT_PAGE:
      return {
        ...state,
        nextPage: action.payload
      }
    default:
      return state;
  }
}