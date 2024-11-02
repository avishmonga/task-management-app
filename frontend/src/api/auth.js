import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const API_URL = `${BASE_URL}/api/auth`;

export const signupUser = async (data) => {
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
