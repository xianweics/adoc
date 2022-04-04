import axios from "axios";
import {
  message
} from "antd";

const createRequest = () => {
  const request = axios.create({
    baseURL: 'http://localhost:2000/serviceProducts'
    // withCredentials: true
  });

  request.interceptors.request.use(
    (config) => {
      // 接口放行
      if (config.url === "login") return config;
      // 重新获取访客令牌
      if (config.url === "setToken") {
        // 重定向到setToken接口
        config.baseURL = 'http://localhost:2000/serviceAuth';
        const refreshToken = localStorage.getItem("refreshToken");
        const userName = localStorage.getItem("userName");
        // 设置请求头
        config.headers.refreshToken = refreshToken;
        config.headers.userName = userName;
      } else {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          // 设置请求头
          config.headers.accessToken = accessToken;
        }
      }
      return config;
    },
    (e) => {
      return Promise.reject(e);
    }
  );

  request.interceptors.response.use(
    (res) => {
      return new Promise((resolve) => {
        try {
          const {
            code,
            message: msg,
            data
          } = res.data;
          if (code === 200) {
            msg && message.success(msg);
            resolve(data);
          } else if (code === 30002) {
            // 访客令牌过期，重新获取访客令牌
            request
              .get("setToken")
              .then((response) => {
                if (response.accessToken) {
                  // 获取新的访客令牌，更新到localstroage
                  localStorage.setItem("accessToken", response.accessToken);
                  // 重新请求原先接口
                  request(res.config).then((r) => {
                    resolve(r);
                  });
                }
              })
              .catch(() => {
                resolve(false);
              });
          } else if (code === 30004) {
            message.error(msg);
            localStorage.clear();
            setTimeout(() => {
              // 刷新令牌过期或者无效，重定向到登陆页面
              window.location.href = "/auth-spa";
            }, 500);
          } else {
            message.error(msg);
            resolve(false);
          }
        } catch (e) {
          resolve(false);
        }
      });
      // return result
    },
    (error) => {
      // 超时判断
      if (
        error.code === "ECONNABORTED" &&
        error.message.indexOf("timeout") > -1
      ) {
        message.error("请求超时");
      }
      return Promise.reject(error);
    }
  );

  return request;
};

export default createRequest;