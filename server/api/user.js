const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const {balance} = req.body
    console.log('REQ>BODY:', req.body)
    const [updated, rows] = await User.update(
      {balance},
      {
        where: {
          id: req.user.id
        }
      }
    )
    if (!updated) next()
    res.json(updated)
  } catch (error) {
    next(error)
  }
})
