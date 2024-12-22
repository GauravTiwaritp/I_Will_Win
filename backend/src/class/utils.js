const mongoose = require('mongoose');

class Utils {
  convertStringToObjectId(string) {
    return new mongoose.Types.ObjectId(string);
  }
}

module.exports = Utils;
