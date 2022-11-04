'use strict';
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('qwer1234', 10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [{
      name: 'Leandro',
      surname: 'Binetti',
      email: 'lbinetti@hasar.com',
      password: hash,
      isAdmin: true,
      firma: '/assets/firma/leandro.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Users', [{
      name: 'Federico',
      surname: 'Tagliabue',
      email: 'ftagliabue@hasar.com',
      password: hash,
      firma: '/assets/firma/fede.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
