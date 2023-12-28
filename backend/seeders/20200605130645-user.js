'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('users', [
          {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
