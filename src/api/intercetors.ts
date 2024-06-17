import axios, { type CreateAxiosDefaults } from 'axios';
const https = require('https');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const options: CreateAxiosDefaults = {
  baseURL: 'http://188.226.94.79:443',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

const axiosClassic = axios.create(options);

export default axiosClassic;
