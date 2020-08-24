import fetch from "node-fetch";
import Bluebird from "bluebird";
import { API_URL } from "../config.json";
import store from "../redux/store";
import { setUnauthenticated } from "../redux/actions/authAction";
import checkJwtExpiry from "../utils/checkJwtExpiry";
import pushNotify from "../utils/pushNotify";
fetch.Promise = Bluebird;
async function handleResponse(res) {
  if(!res.ok) {
    throw await res.json();
  }
  return await res.json();
}
function refreshAccessToken() {
  if(!checkJwtExpiry(localStorage.getItem("c_token"))) {
    return fetch(API_URL+"/users/refresh", {
      method: "post",
      body: JSON.stringify({
        refreshToken: localStorage.getItem("r_token")
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => {
      localStorage.setItem("c_token", data.accessToken);
    }).catch(e => {
      pushNotify({title: "Error", message: "Phiên đăng nhập của bạn đã hết hạn", type: "warning"});
      store.dispatch(setUnauthenticated());
    })
  }
}
const api = {
  get: async (path) => {
    const option = {
      method: "get"
    }
    if(!!localStorage.getItem('r_token')) {
      await refreshAccessToken();
      option.headers = {
          "Authorization": "Bearer " + localStorage.getItem('c_token')
      }
    }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}${path}`, option)
        .then(handleResponse)
        .then(body => {
          resolve(body);
        }).catch(err => {
          reject(err);
        })
    );
  },
  post: async (path, data) => {
    const option = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if(!!localStorage.getItem('r_token')) {
      await refreshAccessToken();
      option.headers["Authorization"] = "Bearer " + localStorage.getItem('c_token')
    }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}${path}`, option)
        .then(handleResponse)
        .then(body => {
          resolve(body);
        }).catch(err => {
          reject(err)
        })
    );
  },
  uploadFile: async (data) => {
    await refreshAccessToken();
    const option = {
      method: "post",
      body: data,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('c_token')
      }
    }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/images`, option)
        .then(handleResponse)
        .then(body => {
          resolve(body);
        }).catch(err => {
        reject(err);
      })
    );
  }
}

export default api;