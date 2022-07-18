import axios from "axios";

export const BASE_URL = `https://wallet.imrandev.com/api`;

export const setToken = token => {
  const bearerToken = `Bearer ${token}`;
  localStorage.setItem('access_token', bearerToken);
  axios.defaults.headers.common['Authorization'] = bearerToken;
};

export const getToken = () => {
  const bearerToken = localStorage.getItem('access_token');
  if(bearerToken){
    axios.defaults.headers.common['Authorization'] = bearerToken;
  }
}

export const removeToken = () => {
  localStorage.removeItem('access_token');
  axios.defaults.headers.common['Authorization'] = '';
}