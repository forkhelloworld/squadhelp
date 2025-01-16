const chatRouter = require('express').Router()
const chatController = require('../controllers/chatController')
const checkToken = require('../middlewares/checkToken')

chatRouter.post('/newMessage', checkToken.checkToken, chatController.addMessage)

chatRouter.get('/getChat', checkToken.checkToken, chatController.getChat)

chatRouter.get('/getPreview', checkToken.checkToken, chatController.getPreview)

chatRouter.post('/blackList', checkToken.checkToken, chatController.blackList)

chatRouter.post('/favorite', checkToken.checkToken, chatController.favoriteChat)

chatRouter.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog
)

chatRouter.put(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog
)

chatRouter.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog
)

chatRouter.delete(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog
)

chatRouter.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog
)

chatRouter.get(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs
)

module.exports = chatRouter
