import Pool from 'pg-pool';
import config from './config.js';

const { database } = config;

const pool = new Pool({
  database: database.database,
  user: database.username,
  password: database.password,
  port: database.port,
  host: database.host
});

export default async function query(sql, values) {
  const client = await pool.connect();
  const result = await client.query(sql, values);
  client.release();
  return result;
}
