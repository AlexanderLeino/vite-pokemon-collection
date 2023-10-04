const router = require("express").Router()
const CardController = require('../../controllers/card')

//matches api/card/findCard
router.route('/createCard')
    .post(CardController.createCard)

router.route('/findCard')
    .post(CardController.findCard)

router.route('/doesCardExistInDb')
    .post(CardController.cardExistInDb)

router.route('/generateURL')
    .post(CardController.generateURL)

router.route("/getUpdatedImage")
    .post(CardController.getUpdatedImage)
    
module.exports = router