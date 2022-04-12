export const formatFullPath = ({
  protocol = 'http',
  address = 'localhost',
  port = 8080,
  subUrl = ''
}) => `${protocol}://${address}:${port}/${subUrl}`;

export const mysqlPoolQuery = function query(
  sql,
  values,
  poolCluster,
  poolKey
) {
  return new Promise((resolve, reject) => {
    poolCluster.of(poolKey).getConnection((err, connection) => {
      console.info(err, 11);
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
};

// 接口返回数据结构
export const wrapperResponse = ({ code, data, message = '操作成功' }) => {
  return {
    code,
    data,
    message
  };
};
