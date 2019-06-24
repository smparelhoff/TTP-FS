const router = require('express').Router()
const {Trade} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const portfolio = await Trade.findAll({where: {userId: req.user.id}})
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.shares || req.body.shares < 1)
      throw Error('Invalid shares value.')
    else {
      const {symbol, price, shares} = req.body
      const addStock = await Trade.create({
        symbol,
        price,
        shares,
        userId: req.user.id
      })
      res.json(addStock)
    }
  } catch (err) {
    next(err)
  }
})
