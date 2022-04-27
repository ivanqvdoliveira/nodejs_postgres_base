'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('profiles', [{
      description: 'ADMIN',
    }, {
      description: 'MANAGER',
    }, {
      description: 'STANDARD',
    }]);

  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('profiles');
  }
};
