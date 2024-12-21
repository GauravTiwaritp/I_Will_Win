class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something went wrong', // user-facing message
    errors = [], // detailed errors, e.g., missing fields
    stack = '' // stack trace for debugging
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.stack = stack;

    // Capture stack trace unless explicitly provided
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
