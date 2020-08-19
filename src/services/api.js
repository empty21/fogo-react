import fetch from "node-fetch";
import Bluebird from "bluebird";
import { API_URL } from "../config.json";
import store from "../redux/store";
import { setUnauthenticated } from "../redux/actions/authAction";
import checkJwtExpiry from "../utils/checkJwtExpiry";
import pushNotify from "../utils/pushNotify";
fetch.Promise = Bluebird;

async function refreshAccessToken() {
  if(!checkJwtExpiry(localStorage.getItem("c_token"))) {
    await api.post("/users/refresh", {
      refreshToken: localStorage.getItem("r_token")
    }).then(data => {
      localStorage.setItem("c_token", data.accessToken);
    }).catch(e => {
      pushNotify({title: "Error", message: "Phiên đăng nhập của bạn đã hết hạn", type: "warning"});
      store.dispatch(setUnauthenticated());
    })
  }
}
const api = {
  get: (path) => {
    return new Promise((resolve, reject) =>
       fetch(`${API_URL}${path}`)
         .then(res => res.json())
         .then(body => {
           resolve(body);
         }).catch(err => {
           reject(err)
        })
   );
  },
  post: (path, data) => {
    const option = {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}${path}`, option)
        .then(res => res.json())
        .then(body => {
          resolve(body);
        }).catch(err => {
          reject(err)
        })
    );
  },
  getWithAuth: async (path) => {
    await refreshAccessToken();
    const option = {
      method: "get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('c_token'),
        "Content-Type": "application/json"
      }
    }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}${path}`, option)
        .then(res => res.json())
        .then(body => {
          resolve(body);
        }).catch(err => {
          reject(err);
        })
    );
  },
  postWithAuth: async (path, data) => {
    await refreshAccessToken();
    const option = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('c_token')
      }
    }
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}${path}`, option)
        .then(res => res.json())
        .then(body => {
          resolve(body);
        }).catch(err => {
          reject(err)
        })
    );
  }
}

export default api;