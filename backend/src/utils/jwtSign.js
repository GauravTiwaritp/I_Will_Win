const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(
  path.join(__dirname, '../../private_key.pem'),
  'utf-8'
);
const signInoptions = {
  algorithm: 'ES256',
  expiresIn: '7d',
};
const jwtSign = (payload) => {
  return jwt.sign(payload, privateKey, signInoptions);
};

module.exports = jwtSign;
