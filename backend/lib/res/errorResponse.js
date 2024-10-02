export function errorResponse(message, status) {
  return {
    success: false,
    status: status,
    message: message,
    data: {},
    error: message,
  };
}
