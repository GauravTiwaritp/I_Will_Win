const logger = require('./logger');
const express = require('express');
logger.info('Express module called');
const cors = require('cors');
logger.info('cors module called');

const morgan = require('morgan');
const jwt = require('jsonwebtoken');
logger.info('jwt module called');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

require('dotenv').config();

const { connectToDatabase } = require('./src/models/dbConnection');
const errorHandler = require('./src/config/ApiErrorHandle');
const { maskSensitiveData, filterHeaders } = require('./src/utils/filtering');
app.use((req, res, next) => {
  const startTime = Date.now();
  if (req.files) {
    req.files.forEach((file) => {
      // You can log other information such as file size, type, etc.
      logger.info({
        method: req.method,
        url: req.url,
        file: {
          filename: file.originalname,
          size: file.size,
          type: file.mimetype,
        },
      });
    });
  }
  let decoded;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, publicKey);
  }
  const userId = decoded?.userId;
  const userRole = decoded?.userRole;
  logger.info({
    timestamp: new Date().toISOString(),
    //eventId: eventId,
    userId: userId || 'anonymous',
    userRole: userRole || 'unknown',
    method: req.method,
    url: req.originalUrl,
    message: 'Request received',
    body: maskSensitiveData(req.body), // Custom function to exclude passwords
    headers: filterHeaders(req.headers), // Custom function to filter headers
    ip: req.ip,
  });
  res.on('finish', () => {
    const responseTime = `${Date.now() - startTime} ms`;
    logger.info({
      timestamp: new Date().toISOString(),
      //eventId: eventId,
      userId: userId || 'anonymous',
      userRole: userRole || 'unknown',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime,
      message: 'Response sent',
    });
  });
  next();
});

app.use(errorHandler);

connectToDatabase();

app.listen(process.env.PORT || 3000, () => {
  logger.info('Server is running on port 3000');
});
