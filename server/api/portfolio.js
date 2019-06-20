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
    const {symbol, price, shares} = req.body
    const addStock = await Trade.create({symbol, price, shares})
    res.json(addStock)
  } catch (err) {
    next(err)
  }
})
