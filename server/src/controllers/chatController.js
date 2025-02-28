const db = require('../models')
const controller = require('../socketInit')

const findConversationWithParticipants = async participants => {
  return await db.Conversation.findOne({
    include: {
      model: db.ConversationParticipant,
      where: { user_id: participants }
    },
    where: {
      id: {
        [db.Sequelize.Op.in]: db.sequelize.literal(`(
        SELECT chat_id 
        FROM conversation_participants
        WHERE user_id IN (${participants.join(',')})
        GROUP BY chat_id 
        HAVING COUNT(DISTINCT user_id) = ${participants.length}
      )`)
      }
    }
  })
}

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.body.recipient, req.tokenData.userId]
  try {
    let conversation = await findConversationWithParticipants(participants)
    if (!conversation) {
      return res.status(404).send({ message: 'Conversation not found' })
    }

    const message = await db.Message.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: conversation.id
    })

    const participantRecords = await db.ConversationParticipant.findAll({
      where: { chat_id: conversation.id }
    })

    const blackList = participantRecords.map(p => p.is_blocked)
    const favoriteList = participantRecords.map(p => p.is_favorite)

    const preview = {
      id: conversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList,
      favoriteList
    }

    controller.getChatController().emitNewMessage(req.body.recipient, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email
        }
      }
    })

    res.send({
      message,
      preview: { ...preview, interlocutor: req.body.interlocutor }
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getChat = async (req, res, next) => {
  const interlocutorId = +req.query.interlocutorId
  const participants = [req.tokenData.userId, interlocutorId].sort(
    (a, b) => a - b
  )

  try {
    let conversation = await findConversationWithParticipants(participants)

    if (!conversation) {
      conversation = await db.Conversation.create()
      await db.ConversationParticipant.bulkCreate([
        { chat_id: conversation.id, user_id: interlocutorId },
        { chat_id: conversation.id, user_id: req.tokenData.userId }
      ])
    }

    const messages = await db.Message.findAll({
      where: { conversation: conversation.id },
      order: [['createdAt', 'ASC']]
    })

    const interlocutor = await db.Users.findByPk(interlocutorId, {
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
    })
    res.send({ messages, interlocutor })
  } catch (err) {
    next(err)
  }
}

module.exports.getPreview = async (req, res, next) => {
  try {
    const userId = req.tokenData.userId
    const conversations = await db.Conversation.findAll({
      include: {
        model: db.ConversationParticipant,
        where: { user_id: userId }
      }
    })
    const previewData = await Promise.all(
      conversations.map(async conversation => {
        const lastMessage = await db.Message.findOne({
          where: { conversation: conversation.id },
          order: [['createdAt', 'DESC']]
        })

        let participants = await db.ConversationParticipant.findAll({
          where: { chat_id: conversation.id }
        })

        const blackList = participants.map(p => p.is_blocked)
        const favoriteList = participants.map(p => p.is_favorite)

        const interlocutorId = participants.find(
          p => p.user_id !== userId
        )?.user_id

        const interlocutor = await db.Users.findByPk(interlocutorId, {
          attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
        })

        participants = participants.map(p => p['user_id'])

        return {
          id: conversation.id,
          sender: lastMessage?.sender,
          text: lastMessage?.body,
          createdAt: lastMessage?.createdAt,
          participants,
          blackList,
          favoriteList,
          interlocutor
        }
      })
    )
    res.send(previewData)
  } catch (err) {
    next(err)
  }
}

module.exports.blackList = async (req, res, next) => {
  try {
    const { blackListFlag, participants } = req.body
    const userId = req.tokenData.userId

    const chat = await findConversationWithParticipants(participants)

    if (!chat) {
      return res.status(404).send({ message: 'Chat not found' })
    }

    await db.ConversationParticipant.update(
      { is_blocked: blackListFlag },
      { where: { chat_id: chat.id, user_id: userId } }
    )

    const participantsData = await db.ConversationParticipant.findAll({
      where: { chat_id: chat.id },
      attributes: ['user_id', 'is_blocked', 'is_favorite']
    })

    const participantsList = participantsData.map(p => p.user_id)
    const blackList = participantsData.map(p => p.is_blocked)
    const favoriteList = participantsData.map(p => p.is_favorite)

    const response = {
      participants: participantsList,
      blackList,
      favoriteList,
      chat_id: chat.id
    }

    res.status(200).send(response)

    const interlocutorId = participants.find(
      participant => participant !== userId
    )
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, response)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { favoriteFlag, participants } = req.body
    const userId = req.tokenData.userId

    const chat = await findConversationWithParticipants(participants)
    if (!chat) {
      return res.status(404).send({ message: 'Chat not found' })
    }

    await db.ConversationParticipant.update(
      { is_favorite: favoriteFlag },
      { where: { chat_id: chat.id, user_id: userId } }
    )

    const participantsData = await db.ConversationParticipant.findAll({
      where: { chat_id: chat.id },
      attributes: ['user_id', 'is_blocked', 'is_favorite']
    })

    const participantsList = participantsData.map(p => p.user_id)
    const blackList = participantsData.map(p => p.is_blocked)
    const favoriteList = participantsData.map(p => p.is_favorite)

    const response = {
      participants: participantsList,
      blackList,
      favoriteList,
      chat_id: chat.id
    }

    res.status(200).send(response)

    const interlocutorId = participants.find(
      participant => participant !== userId
    )
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, response)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalog.create({
      user_id: req.tokenData.userId,
      name: req.body.catalogName
    })
    if (req.body.chatId) {
      await db.CatalogChat.create({
        catalog_id: catalog.id,
        chat_id: req.body.chatId
      })
    }
    const response = {
      id: catalog.id,
      catalogName: catalog.name,
      chats: [req.body.chatId]
    }
    res.status(201).send(response)
  } catch (err) {
    next(err)
  }
}

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const [, [updatedCatalog]] = await db.Catalog.update(
      { name: req.body.catalogName },
      {
        where: {
          id: req.body.catalogId,
          user_id: req.tokenData.userId
        },
        returning: true
      }
    )

    if (!updatedCatalog) {
      return res.status(404).send({ message: 'Catalog not found' })
    }

    res.send(updatedCatalog)
  } catch (err) {
    next(err)
  }
}

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalog.findOne({
      where: {
        id: req.body.catalogId,
        user_id: req.tokenData.userId
      },
      include: {
        model: db.CatalogChat,
        attributes: ['chat_id']
      }
    })

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found' })
    }

    await db.CatalogChat.create({
      catalog_id: catalog.id,
      chat_id: req.body.chatId
    })

    const chats = catalog.CatalogChats.map(chat => chat.chat_id)

    res.send({ catalogName: catalog.name, chats: [...chats, req.body.chatId] })
  } catch (err) {
    next(err)
  }
}

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalog.findOne({
      where: {
        user_id: req.tokenData.userId
      },
      include: {
        model: db.CatalogChat,
        attributes: ['chat_id', 'id']
      }
    })
    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found' })
    }
    await db.CatalogChat.destroy({
      where: { catalog_id: catalog.id, chat_id:req.query.chatId}
    })
    const chats = catalog.CatalogChats.map(chat => {
      if (chat.chat_id != req.query.chatId) {
        return chat.chat_id
      }
    })
    res.send({ catalogName: catalog.name, chats })
  } catch (err) {
    next(err)
  }
}

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await db.Catalog.destroy({
      where: {
        id: req.query.catalogId
      }
    })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalog.findAll({
      where: { user_id: req.tokenData.userId },
      attributes: ['id', 'name'],
      include: {
        model: db.CatalogChat,
        attributes: ['chat_id']
      }
    })

    const result = catalogs.map(catalog => ({
      id: catalog.id,
      catalogName: catalog.name,
      chats: catalog.CatalogChats.map(chat => chat.chat_id)
    }))

    res.send(result)
  } catch (err) {
    next(err)
  }
}
