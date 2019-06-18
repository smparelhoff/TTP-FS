const Sequelize = require('sequelize')
const db = require('../db')

const Trade = db.define('trade', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return this.getDataValue('price' / 100)
    },
    set(valueToBeSet) {
      this.setDataValue('price', valueToBeSet * 100)
    }
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Trade
