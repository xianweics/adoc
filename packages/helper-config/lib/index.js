"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.service = exports.sentry = exports.middleware = exports.client = exports.auth = void 0;
const serviceUsers = "serviceUsers";
const serviceProducts = "serviceProducts";
const serviceAuth = "serviceAuth";
const sentry = {
  dsn: "http://ff7764eb82a94a6dbf34182217a88106@localhost:9000/1",
  send: false
};
exports.sentry = sentry;
const client = {
  srcName: "",
  destName: "clientDist",
  entryHome: "index.html",
  outputHome: "index.html"
};
exports.client = client;
const middleware = {
  port: 2000,
  address: "127.0.0.1",
  protocol: "http",
  isHttps: false,
  service: {
    vue: serviceUsers,
    react: serviceProducts,
    auth: serviceAuth
  }
};
exports.middleware = middleware;
const service = {
  [serviceUsers]: {
    port: 4000,
    address: "127.0.0.1",
    protocol: "http"
  },
  [serviceProducts]: {
    port: 4001,
    address: "127.0.0.1",
    protocol: "http"
  },
  [serviceAuth]: {
    port: 4002,
    address: "127.0.0.1",
    protocol: "http"
  }
};
exports.service = service;
const auth = {
  secretKey: "MICRO_SECRET_AUTH_KEY",
  secretRefreshKey: "MICRO_SECRET_AUTH_REFRESH_KEY",
  accessTokenExp: "5m",
  refreshTokenExp: "24h"
};
exports.auth = auth;