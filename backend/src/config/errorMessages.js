const errorMessages = {
  MISSING_PARAMETERS: (fields) => ({
    statusCode: 400,
    message: `Missing required fields: ${fields}`,
    errors: fields
      .split(', ')
      .map((field) => ({ field, message: `${field} is required.` })),
  }),
  ALREADY_REGISTERED: {
    statusCode: 400,
    message: `User already registered`,
    errors: ['User already registered for email'],
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error',
    errors: ['Internal server error'],
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: 'User not found',
    errors: ['User not found'],
  },
  INVALID_PASSWORD: {
    statusCode: 401,
    message: 'Invalid password',
    errors: ['Invalid password'],
  },
};
