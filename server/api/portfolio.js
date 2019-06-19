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
