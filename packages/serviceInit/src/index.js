import mysql from "mysql";
import redis from "redis";
import { redisConfig } from "./config.js";

class PoolCluster {
  constructor() {
    this.poolCluster = mysql.createPoolCluster();
    this._instance = null;
  }

  static getInstance() {
    if (!PoolCluster._instance) {
      PoolCluster._instance = new PoolCluster();
    }
    return PoolCluster._instance;
  }
}

class RedisClient {
  constructor() {
    const client = redis.createClient(redisConfig);
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.connect();
    this.redisClient = client;
    this._instance = null;
  }

  static getInstance() {
    if (!RedisClient._instance) {
      RedisClient._instance = new RedisClient();
    }
    return RedisClient._instance;
  }
}

export { PoolCluster, RedisClient };
