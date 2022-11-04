'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Informe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Informe.init({
    userName: {
      type: DataTypes.STRING,
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
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z\sA-Z]+$/i,
          msg: 'Name must be only letters'
        }
      }
    },
    userSurname: {
      type: DataTypes.STRING,
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
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z\sA-Z]+$/i,
          msg: 'Surname must be only letters'
        }
      }
    },
    userFirma: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your userFirma'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'userFIrma must be between 1 and 255 characters'
        },
      }
    },
    expediente: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your expediente'
      },
      validate: {
        len: {
          args: [1, 20],
          msg: 'expediente must be between 1 and 20 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z%$()\[\]*:;]+$/i,
          msg: 'expediente must be only letters and numbers'
        }
      }
    },
    informe: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your informe'
      },
      validate: {
        len: {
          args: [1, 20],
          msg: 'informe must be between 1 and 20 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z%$()\[\]*:;]+$/i,
          msg: 'informe must be only letters and numbers'
        }
      }
    },
    homologador: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your homologador'
      },
      validate: {
        len: {
          args: [1, 30],
          msg: 'homologador must be between 1 and 30 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z]+$/i,
          msg: 'homologador must be only letters and numbers'
        }
      }
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your sector'
      },
      validate: {
        len: {
          args: [1, 30],
          msg: 'sector must be between 1 and 30 characters'
        },
        is: {
          args: /^[0-9A-Za-z\sáéíóúñ]+$/i,
          msg: 'sector must be only letters and numbers'
        }
      }
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your empresa'
      },
      validate: {
        len: {
          args: [1, 30],
          msg: 'empresa must be between 1 and 30 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z]+$/i,
          msg: 'empresa must be only letters and numbers'
        }
      }
    },
    detalle: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter your detalle'
      },
      validate: {
        len: {
          args: [1, 1000],
          msg: 'detalle must be between 1 and 1000 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z]+$/i,
          msg: 'detalle must be only letters and numbers'
        }
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your estado'
      },
      validate: {
        len: {
          args: [1, 30],
          msg: 'estado must be between 1 and 30 characters'
        },
        is: {
          args: /^[a-zA-Z]+$/i,
          msg: 'estado must be only letters'
        }
      }
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter your motivo'
      },
      validate: {
        len: {
          args: [1, 1000],
          msg: 'motivo must be between 1 and 1000 characters'
        },
        is: {
          args: /^[\-_.,ñÑáéíóúÁÉÍÓÚÜüa-z0-9\sA-Z]+$/i,
          msg: 'motivo must be only letters and numbers'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Informe',
  });
  return Informe;
};
