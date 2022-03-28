const formatFullPath = ({ protocol = 'http', address = 'localhost', port = 8080, subUrl = '' }) =>
  `${protocol}://${address}:${port}/${subUrl}`;

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

module.exports = {
  formatFullPath,
  mysqlPoolQuery
};
