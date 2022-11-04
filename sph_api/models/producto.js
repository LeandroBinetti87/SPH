'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto.init({
    marca: {
      type: DataTypes.STRING,
      allowNull:  true,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Marca must be between 2 and 50 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z%$()\[\]*:;]+$/i,
          msg: 'Marca must be only letters and numbers'
        }
      }
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your modelo'
      },
      validate: {
        len: {
          args: [2, 50],
          msg: 'Modelo must be between 2 and 50 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z%$()\[\]*:;]+$/i,
          msg: 'Modelo must be only letters and numbers'
        }
      }
    },
    version: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your version'
      },
      validate: {
        len: {
          args: [2, 50],
          msg: 'Version must be between 2 and 50 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z%$()\[\]*:;]+$/i,
          msg: 'Version must be only letters and numbers'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};