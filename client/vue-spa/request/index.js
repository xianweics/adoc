import axios from 'axios';
import { middleware } from '@project/config';

const request = axios.create({
  baseURL: middleware.protocol + '://' + middleware.address + ':' + middleware.port + '/serviceUsers',
  headers: {
    post: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
  // withCredentials: true
});

request.interceptors.request.use(config => {
  console.info(config);
  return config;
}, e => {
  return Promise.reject(e);
});

request.interceptors.response.use(res => {
  let result = {};
  try{
    result = res.data.data;
  }catch (e) {
    result = {};
  }
  return result;
}, (e) => {
  return Promise.reject(e);
});

export default request;