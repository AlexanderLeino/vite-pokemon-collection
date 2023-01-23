const router = require("express").Router()
const UserController = require('../../controllers/user')

//matches api/user/createUser
router.route('/createUser')
    .post(UserController.createUser)

router.route('/signIn')
    .post(UserController.signIn)

module.exports = router