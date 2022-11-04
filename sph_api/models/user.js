'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      },
      validate: {
        len: {
          args: [2, 50],
          msg: 'Name must be between 2 and 50 characters'
        },
        is: {
          args: /^[A-Za-z\sáéíóúñ]+$/i,
          msg: 'Name must be only letters'
        }
      }
    },
    surname: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter your surname'
      },
      validate: {
        len: {
          args: [2, 50],
          msg: 'Surname must be between 2 and 50 characters'
        },
        is: {
          args: /^[A-Za-z\sáéíóúñ]+$/i,
          msg: 'Surname must be only letters'
        }
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter your email'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number'
      },
      validate: {
        len: {
          args: [8, 100],
          msg: 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number33'
        }
      }
    },
    firma: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your firma'
      },
      validate: {
        len: { 
          args: [0, 255],
          msg: 'Firma must be between 0 and 255 characters'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};