const errorMessages = require('../config/errorMessages');
const ApiError = require('../utils/ApiError');
const APIResponse = require('../utils/ApiResponse');
const authModel = require('../models/authModel');
const jwtSign = require('../utils/jwtSign');
const logger = require('../../logger');
const stockModel = require('../models/stockModel');
const Utils = require('./utils');
const utils = new Utils();

class Stock {
  async getStocks(payload) {
    const { userId } = payload;
    const id = utils.convertStringToObjectId(userId);
    try {
      const user = await authModel.findById(id);
      console.log(user);
      if (!user) {
        const error = errorMessages.USER_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const stocks = await stockModel.find({ userId: user._id });
      return new APIResponse(200, stocks);
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
  async addStock(payload) {
    const { userId, companyName, ticker, buyPrice, quantity, dateOfPurchase } =
      payload;
    const id = utils.convertStringToObjectId(userId);
    try {
      const user = await authModel.findById(id);
      if (!user) {
        const error = errorMessages.USER_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const newStock = new stockModel({
        userId: user._id,
        companyName,
        ticker,
        buyPrice,
        quantity,
        dateOfPurchase,
      });
      await newStock.save();
      return new APIResponse(200, newStock);
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
  async updateStock(payload) {
    const { userId, companyName, ticker, buyPrice, quantity, dateOfPurchase } =
      payload;
    const id = utils.convertStringToObjectId(userId);
    try {
      const user = await authModel.findById(id);
      if (!user) {
        const error = errorMessages.USER_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const stock = await stockModel.findOne({ userId: user._id });
      if (!stock) {
        const error = errorMessages.STOCK_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }

      const updateStock = new stockModel({
        userId: user._id,
        companyName,
        ticker,
        buyPrice,
        quantity,
        dateOfPurchase,
      });
      await updateStock.save();
      return new APIResponse(200, updateStock);
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
  async deleteAllStockOfACompany(payload) {
    const { ticker } = payload;
    try {
      const stock = await stockModel.findOne({ ticker });
      if (!stock) {
        const error = errorMessages.STOCK_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      await stockModel.deleteMany({ ticker });
      return new APIResponse(200, stock);
    } catch (error) {
      logger.error(error);
      throw new ApiError(
        errorMessages.INTERNAL_SERVER_ERROR.statusCode,
        errorMessages.INTERNAL_SERVER_ERROR.message,
        errorMessages.INTERNAL_SERVER_ERROR.errors
      );
    }
  }
  async deleteOnlyOneStock(payload) {
    const { userId, stockId } = payload;
    const id = utils.convertStringToObjectId(userId);
    const sId = utils.convertStringToObjectId(stockId);
    try {
      const user = await authModel.findById(id);
      if (!user) {
        const error = errorMessages.USER_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      const stock = await stockModel.findOne({
        userId: user._id,
        _id: sId,
      });
      if (!stock) {
        const error = errorMessages.STOCK_NOT_FOUND;
        throw new ApiError(error.statusCode, error.message, error.errors);
      }
      await stockModel.deleteOne({ userId: user._id, _id: sId });
      return new APIResponse(200, stock);
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

module.exports = Stock;
