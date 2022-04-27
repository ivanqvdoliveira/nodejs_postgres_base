'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Administrador',
      email: 'administrador@gmail.com',
      password: 'e0725d5e02becb7c037a1c4c534f9bab',
      profileId: 1,
      disabledDate: null
    }]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users');
  }
};
