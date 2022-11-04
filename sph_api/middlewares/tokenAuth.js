const { TOKEN_SECRET } = require('../config/token.js');
const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ status: '0', msg: 'Debe enviar el token' })
  }

  try {
    const verified = jwt.verify(token, TOKEN_SECRET)
    req.user = verified
    next();
  } catch (error) {
    return res.status(401).json({ status: '0', msg: 'Token inválido' });
  }
};

module.exports = tokenAuth;