const router = require("express").Router()
const CardSetController = require('../../controllers/cardSet')

//matches api/cardSet/findAll
router.route('/findAll')
    .get(CardSetController.getAllCardSets)

router.route('/findOneCardSet')
    .post(CardSetController.findOneCardSet)

router.route('/addCardSet')
    .post(CardSetController.addCardSet)

module.exports = router