const jwt = require('jsonwebtoken');
const models = require('../models/index');

exports.getInformes = (req, res) => {
  models.Informe.findAll()
    .then(informes => {
      res.status(200).json({ status: '1', msg: 'Informes list', informes });
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.getInformeById = (req, res) => {
  models.Informe.findByPk(req.params.id)
    .then(informe => {
      if (informe) {
        res.status(200).json({ status: '1', msg: 'Informe id:' + req.params.id, informe });
      } else {
        res.status(404).json({ status: '0', msg: 'Informe not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.createInforme = (req, res) => {
  const token = req.headers['x-access-token'];
  const decodedToken = jwt.decode(token);
  models.Informe.create({ userName: decodedToken.name, userSurname: decodedToken.surname, userFirma: decodedToken.firma, expediente: req.query.expediente, 
    informe: req.query.informe, homologador: req.query.homologador, sector: req.query.sector, empresa: req.query.empresa, detalle: req.query.detalle, 
    estado: req.query.estado, motivo: req.query.motivo })
    .then(informe => {
      res.status(201).json({ status: '1', msg: 'Informe created', informe });
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ status: '0', msg: err.errors[0].message });
      } else {
        res.status(501).json({ status: '0', msg: 'Server error | ' + err });
      }
    })
};

exports.updateInformeById = (req, res) => { 
  const token = req.headers['x-access-token'];
  const decodedToken = jwt.decode(token);
  models.Informe.update(
    { userName: decodedToken.name, userSurname: decodedToken.surname, userFirma: decodedToken.firma, expediente: req.query.expediente, 
      informe: req.query.informe, homologador: req.query.homologador, sector: req.query.sector, empresa: req.query.empresa, detalle: req.query.detalle, 
      estado: req.query.estado, motivo: req.query.motivo },
    { where: { id: req.params.id } }
  )
    .then(informe => {
      if (informe) {
        res.status(200).json({ status: '1', msg: 'Informe id:' + req.params.id + ' updated' });
      } else {
        res.status(404).json({ status: '0', msg: 'Informe not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

exports.deleteInformeById = (req, res) => {
  models.Informe.destroy({ where: { id: req.params.id } })
    .then(informe => {
      if (informe) {
        res.status(200).json({ status: '1', msg: 'Informe id:' + req.params.id + ' deleted' });
      } else {
        res.status(404).json({ status: '0', msg: 'Informe not found' });
      }
    })
    .catch(err => {
      res.status(501).json({ status: '0', msg: 'Server error | ' + err });
    })
};

