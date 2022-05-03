import mysql from 'mysql';

export class PoolCluster {
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

export const mysqlPoolQuery = (sql, values, poolCluster, poolKey) =>
  new Promise((resolve, reject) => {
    poolCluster.of(poolKey).getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, values, (err, rows) => {
        if (err) reject(err);

        resolve(rows);
        connection.release();
      });
    });
  });
