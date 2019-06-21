const router = require('express').Router()
const {User, Trade} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const {balance} = await User.findByPk(req.user.id)
    const {tradeId} = req.body
    const {price, shares} = await Trade.findByPk(tradeId)
    const subtract = price / 1000 * shares
    const newBalance = Math.round((balance / 100 - subtract) * 100)
    const [rows, updated] = await User.update(
      {balance: newBalance},
      {where: {id: req.user.id}, returning: true, plain: true}
    )
    res.json(updated)
  } catch (error) {
    next(error)
  }
})
