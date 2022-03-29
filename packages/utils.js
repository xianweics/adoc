// 格式化请求全路径
const formatFullPath = ({ protocol = 'http', address = 'localhost', port = 8080, subUrl = '' }) =>
  `${protocol}://${address}:${port}/${subUrl}`;

// mysql query
const mysqlPoolQuery = function query(sql, values, poolCluster, poolKey) {
  return new Promise((resolve, reject) => {
    poolCluster.of(poolKey).getConnection((err, connection) => {
      if (err) reject(err);

      connection.query(sql, values, (err, rows) => {
        if (err) reject(err);

        resolve(rows);
        connection.release();
      });
    });
  });
}

// 接口返回数据结构
const wrapperResponse = ({ code, data, message = 'ok' }) => {
  return {
    code,
    data,
    message
  }
}

module.exports = {
  formatFullPath,
  mysqlPoolQuery,
  wrapperResponse
};
