import axios from 'axios';
import { API_BASE_URL } from '../constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const res = error.response;
    if (res && res.status === 429) {
      // Normalize various rate-limit response shapes into `data.message`
      let msg = 'Too many requests, please try again later.';
      if (typeof res.data === 'string') msg = res.data;
      else if (res.data?.message) msg = res.data.message;
      else if (res.data?.error) msg = res.data.error;
      res.data = { ...res.data, message: msg };
    }
    return Promise.reject(error);
  }
);

export default apiClient;
