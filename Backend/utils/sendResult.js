export const sendResult = (statusCode, status, data, message) => {
  return {
    statusCode: statusCode,
    status: status,
    data: data,
    message: message,
  }
}

export const sendResponse = (status, data, message) => {
  return {
    status: status,
    data: data,
    message: message,
  }
}
