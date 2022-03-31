import config from "./config.js";
import { mysqlPoolQuery } from "@project/helper-utils";

import PoolCluster from "@project/service-mysql";

const poolCluster = PoolCluster.getInstance().poolCluster;

const { database } = config;
const poolKey = database.database;

poolCluster.add(poolKey, {
  host: database.host,
  user: database.username,
  password: database.password,
  database: database.database,
});

export default function query(sql, values) {
  return mysqlPoolQuery(sql, values, poolCluster, poolKey);
}