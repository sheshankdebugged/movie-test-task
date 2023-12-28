const jwt = require('jsonwebtoken');
const config = require('../config')
module.exports = {

  async issueJwtToken(payload) {
    return jwt.sign(payload, config.secret_key, {expiresIn: '50h'}); // 10 min expiration
  },
  async verifyJwtToken(token, cb) {
    return jwt.verify(token, config.secret_key, cb);
  }
}


