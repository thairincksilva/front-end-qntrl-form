import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qntrl-api.vercel.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

export default api;