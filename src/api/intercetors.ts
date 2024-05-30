import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: 'https://188.226.94.79',
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosClassic = axios.create(options);

export default axiosClassic;
