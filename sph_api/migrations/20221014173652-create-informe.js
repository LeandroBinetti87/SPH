'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Informes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userSurname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userFirma: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expediente: {
        allowNull: false,
        type: Sequelize.STRING
      },
      informe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      homologador: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sector: {
        allowNull: false,
        type: Sequelize.STRING
      },
      empresa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      detalle: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING
      },
      motivo: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Informes');
  }
};