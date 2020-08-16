import { SET_ERROR, SET_SUCCESS, CLEAR_UI, SET_LOADING } from "../types";

const initialState = {
  loading: false,
  errors: null,
  success: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        success: null,
        errors: action.payload
      };
    case SET_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        success: action.payload
      }
    case CLEAR_UI:
      return {
        ...state,
        loading: false,
        errors: null,
        success: null
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}