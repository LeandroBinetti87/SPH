const jwt = require('jsonwebtoken');
const models = require('../models/index');

exports.getProductos = (req, res) => {
  models.Producto.findAll()
    .then(productos => {
      res.status(200).json({ status: '1', msg: 'Productos list', productos });
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.getProductoById = (req, res) => {
  models.Producto.findByPk(req.params.id)
    .then(producto => {
      if (producto) {
        res.status(200).json({ status: '1', msg: 'Producto id:' + req.params.id, producto });
      } else {
        res.status(404).json({ status: '0', msg: 'Producto not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.createProducto = (req, res) => {
  models.Producto.create({ marca: req.query.marca, modelo: req.query.modelo, version: req.query.version})
    .then(producto => {
      res.status(201).json({ status: '1', msg: 'Producto created', producto });
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ status: '0', msg: err.errors[0].message });
      } else {
        res.status(501).json({ status: '0', msg: 'Server error | ' + err });
      }
    })
};

exports.updateProductoById = (req, res) => {
  models.Producto.update({ marca: req.query.marca, modelo: req.query.modelo, version: req.query.version}, { where: { id: req.params.id } })
    .then(producto => {
      if (producto[0] === 1) {
        res.status(200).json({ status: '1', msg: 'Producto updated' });
      } else {
        res.status(404).json({ status: '0', msg: 'Producto not found' });
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

exports.deleteProductoById = (req, res) => {
  models.Producto.destroy({ where: { id: req.params.id } })
    .then(producto => {
      if (producto === 1) {
        res.status(200).json({ status: '1', msg: 'Producto deleted' });
      } else {
        res.status(404).json({ status: '0', msg: 'Producto not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};