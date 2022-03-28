const wrapperResponse = ({ code, data, message = 'ok' }) => {
  return {
    code,
    data,
    message
  }
}
export default wrapperResponse
