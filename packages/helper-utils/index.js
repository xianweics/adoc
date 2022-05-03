export const formatFullPath = ({
  protocol = 'http',
  address = 'localhost',
  port = 8080,
  subUrl = ''
}) => `${protocol}://${address}:${port}/${subUrl}`;

export const wrapperResponse = ({ code, data, message = 'success' }) => ({
  code,
  data,
  message
});
