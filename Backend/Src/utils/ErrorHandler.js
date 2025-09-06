class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ConflictingError extends AppError{
  constructor(message = "Not Found") {
    super(message, 409);
  }
}
function ErrorHandler(err, req, res, next) {

  let statusCode;
  if (err instanceof AppError) {
    statusCode = err.statusCode;
  }
  else {
    statusCode = 500;
  }
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
}
module.exports = {AppError,ErrorHandler, BadRequestError, UnauthorizedError, NotFoundError,ConflictingError };
