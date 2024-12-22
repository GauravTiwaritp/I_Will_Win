const authModel = require('../models/authModel');
const jwtSign = require('../utils/jwtSign');
const ApiResponse = require('../utils/ApiResponse');
const handleMissingParameter = require('../utils/missingParameterHandling');
const Auth = require('../class/auth');
const auth = new Auth();

exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    handleMissingParameter(req.body, ['email', 'name', 'password']);
    const response = await auth.register({ email, name, password });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    handleMissingParameter(req.body, ['email', 'password']);
    const response = await auth.login({ email, password });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
