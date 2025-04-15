import axios from 'axios';
import { AppConfig } from '../utils';

const api = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
