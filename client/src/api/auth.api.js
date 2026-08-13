import apiClient from './axios';

export const registerUser = async payload => {
  const { data } = await apiClient.post('/auth/register', payload);
  return data.data.user;
};

export const loginUser = async payload => {
  const { data } = await apiClient.post('/auth/login', payload);
  return data.data.user;
};

export const logoutUser = async () => {
  const { data } = await apiClient.post('/auth/logout');
  return data;
};

export const getMe = async () => {
  const { data } = await apiClient.get('/auth/get-me');
  return data.data.user;
};
