import api from "../../services/api";
import {
   SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_LOADING, CLEAR_UI, SET_ERROR
} from "../types";
import pushNotify from "../../utils/pushNotify";

export const registerUser = (userData, history) => dispatch => {
  dispatch({type: SET_LOADING});
  api.post("/users/register", userData)
    .then(() => {
      pushNotify({title: "Success", message: "Registered successful"});
      dispatch({
        type: CLEAR_UI
      });
      history.push("/auth/login");
    }).catch(err => {
      pushNotify({title: "Error", message: err.messages, type: "danger"});
      dispatch({
        type: SET_ERROR,
        payload: err
      });
  })
}
export const loginUser = userData => dispatch => {
  dispatch({type: SET_LOADING});
  api.post("/users/login", userData)
    .then(data => {
      localStorage.setItem("r_token", data.refreshToken);
      localStorage.setItem("c_token", data.accessToken);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.fullName);
      pushNotify({title: "Success", message: "Logged in as "+data.username})
      dispatch({
        type: SET_AUTHENTICATED
      });
      dispatch({
        type: CLEAR_UI
      });
    }).catch(err => {
      pushNotify({title: "Error", message: err.messages, type: "danger"})
      dispatch({
        type: SET_ERROR,
        payload: err
      });
  });
}
export const logoutUser = () => dispatch => {
  pushNotify({title: "Success", message: "Loged out"});
  localStorage.clear();
  dispatch({type: SET_UNAUTHENTICATED});
}