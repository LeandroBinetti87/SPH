const models = require('../models/index');
const bcrypt = require('bcrypt');
var fs = require('fs');
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res) => {
  models.User.findAll()
    .then(users => {
      res.status(200).json({ status: '1', msg: 'Users list', users });
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.getUserById = (req, res) => {
  models.User.findByPk(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ status: '1', msg: 'User id:' + req.params.id, user });
      } else {
        res.status(404).json({ status: '0', msg: 'User not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.createUser = (req, res) => {
  const fileSource = req.file.destination + req.file.filename;
  const fileDestination = fileSource + '_' + req.file.originalname;
  const publicDestination = 'assets/firmas/' + req.file.filename + '_' + req.file.originalname;
  fs.rename(fileSource, fileDestination, function (err) {
    if (err) console.log('ERROR: ' + err);
  });

  const hash = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(req.query.password) ? bcrypt.hashSync(req.query.password, 10) : '';
  models.User.create({ name: req.query.name, surname: req.query.surname, email: req.query.email, password: hash, firma: publicDestination, isAdmin: req.query.isAdmin, isEnabled: req.query.isEnabled })
    .then(user => {
      res.status(201).json({ status: '1', msg: 'User created', user });
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ status: '0', msg: err.errors[0].message });
      } else {
        res.status(501).json({ status: '0', msg: 'Server error | ' + err });
      }
    })
};

exports.updateUserById = (req, res) => {
  const fileSource = req.file.destination + req.file.filename;
  const fileDestination = fileSource + '_' + req.file.originalname;
  const publicDestination = 'assets/firmas/' + req.file.filename + '_' + req.file.originalname;
  fs.rename(fileSource, fileDestination, function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  let queryParameters = {};
  if (req.query.password) {
    const hash = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(req.query.password) ? bcrypt.hashSync(req.query.password, 10) : '';
    queryParameters = { name: req.query.name, surname: req.query.surname, email: req.query.email, password: hash, firma: publicDestination, isAdmin: req.query.isAdmin, isEnabled: req.query.isEnabled };
  } else {
    queryParameters = { name: req.query.name, surname: req.query.surname, email: req.query.email, firma: fileDestination, isAdmin: req.query.isAdmin, isEnabled: req.query.isEnabled };
  }
  models.User.update(
    queryParameters,
    { where: { id: req.params.id } }
  )
    .then(user => {
      if (user) {
        res.status(200).json({ status: '1', msg: 'User id:' + req.params.id + ' updated' });
      } else {
        res.status(404).json({ status: '0', msg: 'User not found' });
      }
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ status: '0', msg: err.errors[0].message });
      } else {
        res.status(501).json({ status: '0', msg: 'Server error | ' + err });
      }
    })
};

exports.updatePasswordById = (req, res) => {
  const token = req.headers['x-access-token'];
  const decodedToken = jwt.decode(token);
  console.log(decodedToken.id);
  console.log(req.params.id);
  if(req.params.id == decodedToken.id){
      const hash = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(req.query.password) ? bcrypt.hashSync(req.query.password, 10) : '';
      models.User.update(
        { password: hash },
        { where: { id: req.params.id } }
      )
        .then(user => {
          if (user) {
            res.status(200).json({ status: '1', msg: 'User id:' + req.params.id + ' updated' });
          } else {
            res.status(404).json({ status: '0', msg: 'User not found' });
          }
        })
        .catch(err => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ status: '0', msg: err.errors[0].message });
          } else {
            res.status(501).json({ status: '0', msg: 'Server error | ' + err });
          }
        })
      } else {
        res.status(403).json({ status: '0', msg: 'Forbidden' });
      }
};

exports.deleteUserById = (req, res) => {
  models.User.destroy({ where: { id: req.params.id } })
    .then(user => {
      if (user) {
        res.status(200).json({ status: '1', msg: 'User id:' + req.params.id + ' deleted' });
      } else {
        res.status(404).json({ status: '0', msg: 'User not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};