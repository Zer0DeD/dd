import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: 'http://ipPC:8000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosClassic = axios.create(options);

export default axiosClassic;
