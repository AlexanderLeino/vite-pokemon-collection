const router = require("express").Router()
const UserController = require('../../controllers/user')
//matches api/user/createUser
router.route('/createUser')
    .post(UserController.createUser)

//matches api/user/signIn
router.route('/signIn')
    .post(UserController.signIn)

//matches api/user/updatedCardList   
router.route('/updateCardList')
    .post(UserController.updateCardList)

    //matches api/user/userCollection
router.route('/userCollection')
    .post(UserController.userCollection)

// matches api/user/deleteCardFromCollection
router.route('/deleteCardFromCollection')
    .post(UserController.deleteCard)

router.route("/incrementQuantity")
    .post(UserController.incrementQuantity)

router.route('/doesCardExistOnUser')
    .post(UserController.doesCardExistOnUser)

module.exports = router