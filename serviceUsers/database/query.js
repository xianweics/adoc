import mysql from 'mysql';
import config from './config';

const { database } = config;
const pool = mysql.createPool({
  host: database.host,
  user: database.username,
  password: database.password,
  database: database.database
});

export default function query (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      
      connection.query(sql, values, (err, rows) => {
        if (err) reject(err);
        
        resolve(rows);
        connection.release();
      });
    });
  });
}
