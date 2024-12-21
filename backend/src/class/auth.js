const errorMessages = require('../config/errorMessage');
const ApiError = require('../utils/ApiError');
const APIResponse = require('../utils/ApiResponse');
const authModel = require('../models/authModel');
const jwtSign = require('../utils/jwtSign');
const logger = require('../../logger');
const bcrypt = require('bcryptjs');

class Auth {
  async checkAudience(payload) {
    const { email } = payload;
    try {
      const existingRecord = await authModel.findOne({ userEmail: email });
      if (existingRecord) {
        const error = errorMessages.ALREADY_REGISTERED;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
  hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  async register(payload) {
    try {
      const { email, name, password } = payload;
      await this.checkAudience(email);
      const newUser = new authModel({
        userEmail: email,
        userName: name,
        password: this.hashPassword(password),
      });
      await newUser.save();
      const token = jwtSign({ userId: newUser._id, userRole: 'user' });
      delete newUser.password;
      return new APIResponse(200, newUser, token);
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
  async login(payload) {
    const { email, password } = payload;
    try {
      const user = await authModel.findOne({ userEmail: email });
      if (!user) {
        const error = errorMessages.USER_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        const error = errorMessages.INVALID_PASSWORD;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const token = jwtSign({ userId: user._id, userRole: 'user' });
      delete user.password;
      return new APIResponse(200, user, token);
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
}

module.exports = Auth;
