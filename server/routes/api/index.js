const router = require("express").Router()
const cardRoutes = require('./card')
const cardSetRoutes = require('./cardSet')
const userRoutes = require('./user')
// matches /api/user
// router.route('/user', userRoutes)
  
// matches /api/card
router.use('/card', cardRoutes)

// matches /api/cardSet
router.use('/cardSet', cardSetRoutes)

// matches /api/user
router.use('/user', userRoutes)

module.exports = router