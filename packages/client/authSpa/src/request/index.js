import axios from "axios";
import { middleware } from "../../../../config";
import { formatFullPath } from "../../../../utils";

const { protocol, address, port, service } = middleware;
const request = axios.create({
  baseURL: formatFullPath({ protocol, address, port, subUrl: service.auth }),
  // withCredentials: true
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

request.interceptors.response.use(
  (res) => {
    let result = {};
    try {
      result = res.data.data;
    } catch (e) {
      result = {};
    }
    return result;
  },
  () => {
    return {};
  }
);

export default request;
