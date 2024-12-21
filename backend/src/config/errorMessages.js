const errorMessages = {
  MISSING_PARAMETERS: (fields) => ({
    statusCode: 400,
    message: `Missing required fields: ${fields}`,
    errors: fields
      .split(', ')
      .map((field) => ({ field, message: `${field} is required.` })),
  }),
};
