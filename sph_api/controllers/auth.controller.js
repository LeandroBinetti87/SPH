const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/token.js');
const models = require('../models/index');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {

  try {
    console.log(req.body)
    const user = await models.User.findOne({ where: { email: req.query.email } })
    if (user) {
      if (user.isEnabled) {
        const password_valid = await bcrypt.compare(req.query.password, user.password)
        if (password_valid) {
          const token = jwt.sign({ id: user.id, name: user.name, surname: user.surname, firma: user.firma, isAdmin: user.isAdmin }, TOKEN_SECRET);
          res.status(200).json({ status: '1', msg: 'Logged in successfully', token: token });
        } else {
          res.status(400).json({ status: '0', msg: 'Invalid password' });
        }
      } else {
        res.status(400).json({ status: '0', msg: 'User disabled' });
      }
    } else {
      res.status(400).json({ status: '0', msg: 'User does not exist' });
    }
  }
  catch (err) {
    res.status(500).json({ status: '0', msg: 'Server error | ' + err });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ status: '1', msg: 'Logged out successfully' }); //No implementado, json web token no contempla logout en el server.
};
