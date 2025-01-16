const userRouter = require('express').Router()
const userController = require('../controllers/userController')
const basicMiddlewares = require('../middlewares/basicMiddlewares')
const hashPass = require('../middlewares/hashPassMiddle')
const checkToken = require('../middlewares/checkToken')
const validators = require('../middlewares/validators')
const upload = require('../utils/fileUpload')

userRouter.get('/getUser', checkToken.checkAuth)

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
)
userRouter.post('/login', validators.validateLogin, userController.login)

userRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
)

userRouter.put(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
)

userRouter.put(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
)

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
)

module.exports = userRouter
