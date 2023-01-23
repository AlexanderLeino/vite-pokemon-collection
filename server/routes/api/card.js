const router = require("express").Router()
const CardController = require('../../controllers/card')

//matches api/card/findCard
router.route('/findCard')
    .post(CardController.findCard)

module.exports = router