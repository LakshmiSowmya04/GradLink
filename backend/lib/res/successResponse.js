export function successResponse(message, data, status) {
  return {
    success: true,
    status: status,
    message: message,
    data: data,
    error: {},
  };
}
