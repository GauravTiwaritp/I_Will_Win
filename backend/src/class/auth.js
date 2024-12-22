const errorMessages = require('../config/errorMessages');
const ApiError = require('../utils/ApiError');
const APIResponse = require('../utils/ApiResponse');
const AuthModel = require('../models/authModel');
const jwtSign = require('../utils/jwtSign');
const logger = require('../../logger');
const bcrypt = require('bcryptjs');

class Auth {
  async checkAudience(email) {
    try {
      const existingRecord = await AuthModel.findOne({ userEmail: email });
      if (existingRecord) {
        const error = errorMessages.ALREADY_REGISTERED;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      return true;
    } catch (error) {
      logger.error(error);
      console.log(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async register(payload) {
    try {
      const { email, name, password } = payload;
      await this.checkAudience(email);
      const hashedPassword = await this.hashPassword(password);
      const newUser = new AuthModel({
        userEmail: email,
        userName: name,
        password: hashedPassword,
      });
      await newUser.save();
      const userObj = newUser.toObject();
      delete userObj.password;
      const token = jwtSign({ userId: newUser._id, userRole: 'user' });
      return new APIResponse(200, userObj, token);
    } catch (error) {
      logger.error(error);
      console.log(error);
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
      const user = await AuthModel.findOne({ userEmail: email });
      if (!user) {
        const error = errorMessages.USER_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        const error = errorMessages.INVALID_PASSWORD;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const userObj = user.toObject();
      delete userObj.password;
      const token = jwtSign({ userId: user._id, userRole: 'user' });
      return new APIResponse(200, userObj, token);
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
