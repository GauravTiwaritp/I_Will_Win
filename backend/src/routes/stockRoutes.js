const express = require('express');
const stockController = require('../controllers/stockController');
const stockRouter = express.Router();

stockRouter.get('/getstocks/:userId', stockController.getStocks);
stockRouter.post('/addstocks', stockController.addStock);
stockRouter.post('/updatestocks', stockController.updateStock);
stockRouter.delete(
  '/:userId/deletestocks/:stockId',
  stockController.deleteOnlyOneStock
);
stockRouter.delete('/stocks/:ticker', stockController.deleteAllStockOfACompany);

module.exports = stockRouter;
