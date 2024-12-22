const handleMissingParameter = require('../utils/missingParameterHandling');
const Stock = require('../class/stock');
const stock = new Stock();
const authModel = require('../models/authModel');
const jwtSign = require('../utils/jwtSign');
const ApiResponse = require('../utils/ApiResponse');

exports.getStocks = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    handleMissingParameter(req.params, ['userId']);
    const response = await stock.getStocks({ userId });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.addStock = async (req, res, next) => {
  const { userId, companyName, ticker, buyPrice, quantity, dateOfPurchase } =
    req.body;
  try {
    handleMissingParameter(req.body, [
      'userId',
      'companyName',
      'ticker',
      'buyPrice',
      'quantity',
      'dateOfPurchase',
    ]);
    const response = await stock.addStock({
      userId,
      companyName,
      ticker,
      buyPrice,
      quantity,
      dateOfPurchase,
    });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.updateStock = async (req, res, next) => {
  const { userId, companyName, ticker, buyPrice, quantity, dateOfPurchase } =
    req.body;
  try {
    handleMissingParameter(req.body, [
      'userId',
      'companyName',
      'ticker',
      'buyPrice',
      'quantity',
      'dateOfPurchase',
    ]);
    const response = await stock.updateStock({
      userId,
      companyName,
      ticker,
      buyPrice,
      quantity,
      dateOfPurchase,
    });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.deleteAllStockOfACompany = async (req, res, next) => {
  const { ticker } = req.params;
  try {
    handleMissingParameter(req.params, ['ticker']);
    const response = await stock.deleteAllStockOfACompany({ ticker });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.deleteOnlyOneStock = async (req, res, next) => {
  const { userId, stockId } = req.params;
  console.log(userId, stockId);
  console.log(req.params);
  try {
    handleMissingParameter(req.params, ['userId', 'stockId']);
    const response = await stock.deleteOnlyOneStock({ userId, stockId });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
