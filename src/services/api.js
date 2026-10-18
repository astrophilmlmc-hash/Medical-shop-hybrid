import axios from 'axios';

// Relative base URL ensures browser requests work in both local dev and cloud preview proxies
const API_BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medishop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
