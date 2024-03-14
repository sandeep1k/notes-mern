class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err, req, res, next) => {
  const { statusCode = 500, message = "Internal server error" } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default ApiError;
