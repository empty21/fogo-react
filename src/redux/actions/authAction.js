import api from "../../services/api";
import {
  SET_AUTHENTICATED, SET_UNAUTHENTICATED
} from "../types";
import { setLoading, clearUi } from "./uiAction";
import pushNotify from "../../utils/pushNotify";

export function setAuthenticated() {
  return {
    type: SET_AUTHENTICATED
  }
}
export function setUnauthenticated() {
  return {
    type: SET_UNAUTHENTICATED
  }
}

export const registerUser = (userData, history) => dispatch => {
  dispatch(setLoading());
  api.post("/users/register", userData)
    .then(() => {
      pushNotify({title: "Success", message: "Registered successful"});
      dispatch(clearUi());
      history.push("/auth/verify");
    }).catch(err => {
      pushNotify({title: "Error", message: err.messages, type: "danger"});
  })
}
export const verifyUser = (verifyData, history) => dispatch => {
  dispatch(setLoading());
  api.post("/users/verify", verifyData)
    .then(() => {
      pushNotify({title: "Success", message: "Verified Successfull"});
      dispatch(clearUi());
      history.push("/auth/login");
    }).catch(err => {
    pushNotify({title: "Error", message: err.messages, type: "danger"});
  })
}
export const loginUser = (userData, history) => dispatch => {
  dispatch(setLoading());
  api.post("/users/login", userData)
    .then(async data => {
      console.log(data);
      if(data.statusCode) {
        pushNotify({title: "Error", message: data.messages, type: "danger"});
        dispatch(clearUi());
      } else {
        localStorage.setItem("r_token", data.refreshToken);
        localStorage.setItem("c_token", data.accessToken);
        const user = await api.getWithAuth("/users/me");
        console.log(user);
        localStorage.setItem("fullName", user.fullName);
        localStorage.setItem("role", user.role);
        pushNotify({title: "Success", message: "Logged successful"})
        dispatch(setAuthenticated());
        dispatch(clearUi());
        history.push("/");
      }
    });
}

export const logoutUser = () => dispatch => {
  pushNotify({title: "Success", message: "Loged out"});
  localStorage.clear();
  dispatch(setUnauthenticated());
}
