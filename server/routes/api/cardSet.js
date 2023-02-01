const router = require("express").Router()
const CardSetController = require('../../controllers/cardSet')

//matches api/cardSet/findAll
router.route('/findAll')
    .get(CardSetController.getAllCardSets)

router.route('/findOneCardSet')
    .post(CardSetController.findOneCardSet)

module.exports = router