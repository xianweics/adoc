import config from './config.js';

import { PoolCluster, mysqlPoolQuery } from './utils';

const poolCluster = PoolCluster.getInstance().poolCluster;

const { database } = config;
const poolKey = database.database;

poolCluster.add(poolKey, {
  host: database.host,
  user: database.username,
  password: database.password,
  database: database.database
});

export default function query(sql, values) {
  return mysqlPoolQuery(sql, values, poolCluster, poolKey);
}
