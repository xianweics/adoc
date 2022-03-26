const formatFullPath = ({ protocol = 'http', address = 'localhost', port = 8080, subUrl = '' }) =>
  `${protocol}://${address}:${port}/${subUrl}`;

module.exports = {
  formatFullPath
};
