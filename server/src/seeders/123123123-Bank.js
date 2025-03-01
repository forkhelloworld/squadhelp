module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banks',
      [
        {
          cardNumber: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/27',
          cvc: '453',
          balance: 0
        },
        {
          cardNumber: '4111111111111111',
          name: 'yriy',
          expiry: '09/27',
          cvc: '505',
          balance: 5000
        }
      ],
      {}
    )
  }
}
