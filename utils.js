const formatFullPath = ({ protocol = 'http', address = 'localhost', port = 8080 }) => {
  return protocol + '://' + address + ':' + port;
};

module.exports = {
  formatFullPath
};