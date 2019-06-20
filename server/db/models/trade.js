const Sequelize = require('sequelize')
const db = require('../db')

const Trade = db.define('trade', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Trade.beforeValidate(tradeInstance => {
  tradeInstance.price = parseInt(tradeInstance.price * 1000, 10)
})

module.exports = Trade
