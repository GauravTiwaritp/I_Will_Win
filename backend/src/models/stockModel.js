const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'AuthModel',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dateOfPurchase: {
    type: Date,
    required: true,
  },
});

const StockModel = mongoose.model('StockModel', stockSchema);

module.exports = StockModel;
