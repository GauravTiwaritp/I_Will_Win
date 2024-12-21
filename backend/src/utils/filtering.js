const maskSensitiveData = (body) => {
  if (!body) return body;
  const maskedBody = { ...body };
  if (maskedBody.password) maskedBody.password = '***';
  if (maskedBody.confirmPassword) maskedBody.confirmPassword = '***';
  return maskedBody;
};

const filterHeaders = (headers) => {
  const { 'content-type': contentType, 'user-agent': userAgent } = headers;
  return { contentType, userAgent }; // Only log relevant headers
};

module.exports = {
  maskSensitiveData,
  filterHeaders,
};
