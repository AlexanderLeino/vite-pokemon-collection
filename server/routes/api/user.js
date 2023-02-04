const router = require("express").Router()
const UserController = require('../../controllers/user')
//matches api/user/createUser
router.route('/createUser')
    .post(UserController.createUser)

router.route('/signIn')
    .post(UserController.signIn)

//matches api/user/updatedCardList   
router.route('/updateCardList')
    .post(UserController.updateCardList)

router.route('/findCardSubDoc')
    .post(UserController.findCardSubDoc)

module.exports = router