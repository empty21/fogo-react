import {
  SET_AUTHENTICATED, SET_UNAUTHENTICATED
} from "../types";

export const setAuthenticated = () => {
  return{
    type: SET_AUTHENTICATED
  };
}
export const setUnauthenticated = () => {
  return {
    type: SET_UNAUTHENTICATED
  };
}
