import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
