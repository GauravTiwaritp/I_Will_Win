const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthModel = mongoose.model('AuthModel', authSchema);

module.exports = AuthModel;
