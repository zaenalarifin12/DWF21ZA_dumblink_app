import axios from 'axios';

export const url = "http://192.168.42.127:10000";

export const API = axios.create({
  baseURL: 'http://192.168.42.127:10000/api/v1',
});

export const setAuthToken = token => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};
