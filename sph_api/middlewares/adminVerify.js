const jwt = require('jsonwebtoken');

const adminVerify = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const decodedToken = jwt.decode(token);

  if (!decodedToken.isAdmin) {
    res.status(403).json({ status: '0', msg: 'Access denied' });
  } else {
    next();
  }
};

module.exports = adminVerify;