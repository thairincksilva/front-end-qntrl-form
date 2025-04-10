import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qntrl-api.vercel.app/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;