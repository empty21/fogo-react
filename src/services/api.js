import axios from "axios";
import {API_URL} from "../config.json";

const api = {
  get: (path) => {
    return axios.get(API_URL+path);
  },
  post: (path, data, callback = null) => {
    return new Promise((resolve, reject) =>  {
      axios.post(API_URL+path, data)
        .then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.response.data);
      });
    })
  },
  getWithAuth: (path) => {
    return axios.get(API_URL+path, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken')
      }
    })
  },
  postWithAuth: (path, data) => {
    return axios.post(API_URL+path, data,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken')
      }
    });
  }
}

export default api;