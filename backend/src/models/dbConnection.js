const mongoose = require('mongoose');
const logger = require('../../logger');

connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.Mongodb_Url, {
      dbName: 'conference',
    });
    logger.info('Connected to database');
  } catch (err) {
    console.log(err);
    logger.error('Error connecting to database', err);
    process.exit(1);
  }
};

module.exports = {
  connectToDatabase,
};
