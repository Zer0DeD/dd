import axios, { type CreateAxiosDefaults } from 'axios';
const https = require('https');

const options: CreateAxiosDefaults = {
  baseURL: 'https://188.226.94.79',
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

const axiosClassic = axios.create(options);

export default axiosClassic;
