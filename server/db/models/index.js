const User = require('./user')
const Trade = require('./trade')

//Associations
Trade.belongsTo(User)
User.hasMany(Trade)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Trade
}
