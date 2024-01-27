import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_STACKS_BE_BASE_URL,
  timeout: 8000,
  withCredentials: true,
});
