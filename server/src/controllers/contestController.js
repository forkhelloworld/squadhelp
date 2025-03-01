const db = require('../models')
const ServerError = require('../errors/ServerError')
const contestQueries = require('./queries/contestQueries')
const userQueries = require('./queries/userQueries')
const controller = require('../socketInit')
const UtilFunctions = require('../utils/functions')
const CONSTANTS = require('../constants')
const { sendMail } = require('../utils/mailer')

module.exports.dataForContest = async (req, res, next) => {
  const response = {}
  try {
    const {
      body: { characteristic1, characteristic2 }
    } = req
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean)

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types
        }
      }
    })
    if (!characteristics) {
      return next(new ServerError())
    }
    characteristics.forEach(characteristic => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = []
      }
      response[characteristic.type].push(characteristic.describe)
    })
    res.send(response)
  } catch (err) {
    next(new ServerError('cannot get contest preferences'))
  }
}

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await db.Contest.findOne({
      where: { id: +req.query.contestId },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'access_token']
          }
        },
        {
          model: db.Offer,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.CREATOR
              ? { user_id: req.tokenData.userId }
              : {},
          attributes: { exclude: ['user_id', 'contest_id'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'access_token']
              }
            },
            {
              model: db.Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['user_id', 'offer_id'] }
            }
          ]
        }
      ]
    })
    contestInfo = contestInfo.get({ plain: true })
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark
      }
      delete offer.Rating
    })
    res.send(contestInfo)
  } catch (e) {
    console.log(e);
    next(new ServerError())
  }
}

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName
  res.download(file)
}

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename
    req.body.originalFileName = req.file.originalname
  }
  const contestId = req.body.contestId
  delete req.body.contestId
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      user_id: req.tokenData.userId
    })
    res.send(updatedContest)
  } catch (e) {
    next(e)
  }
}

module.exports.setNewOffer = async (req, res, next) => {
  const obj = { status:CONSTANTS.OFFER_STATUS_PENDING }
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.file_name = req.file.filename
    obj.original_file_name = req.file.originalname
  } else {
    obj.text = req.body.offerData
  }
  obj.user_id = req.tokenData.userId
  obj.contest_id = req.body.contestId
  try {
    const result = await contestQueries.createOffer(obj)
    delete result.contest_id
    delete result.user_id
    controller.getNotificationController().emitEntryCreated(req.body.customerId)
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId })
    res.send(Object.assign({}, result, { User }))
  } catch (e) {
    return next(new ServerError())
  }
}

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  )
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    )
  return rejectedOffer
}

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "order_id"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "order_id"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `)
    },
    { orderId },
    transaction
  )
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "status"= '${CONSTANTS.OFFER_STATUS_PENDING}' AND "id"!=${offerId} THEN '${CONSTANTS.OFFER_STATUS_REJECTED}'
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_DENIED}'
            END
    `)
    },
    {
      contestId
    },
    transaction
  )
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  )

  transaction.commit()
  const arrayRoomsId = []
  updatedOffers.forEach(offer => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId)
    } else if (offer.status === CONSTANTS.OFFER_STATUS_WON) {
      winningOffer = offer.dataValues
    }
  })
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId
    )
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId)
  return updatedOffers
}

const reviewOffer = async (offerId, status) => {
  return await contestQueries.updateOffer({ status: status }, { id: offerId })
}

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      )
      res.send(offer)
    } catch (err) {
      next(err)
    }
  } else if (req.body.command === 'pending') {
    try {
      const offer = await reviewOffer(req.body.offerId, req.body.command)
      sendMail(req.tokenData.email, 'Your offer has been accepted by moderation.')
      res.send(offer)
    } catch (err) {
      next(err)
    }
  } else if (req.body.command === 'denied') {
    try {
      const offer = await reviewOffer(req.body.offerId, req.body.command)
      sendMail(req.tokenData.email, 'Your offer was not accepted by moderation.')
      res.send(offer)
    } catch (err) {
      next(err)
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction()
      const offers = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      )
      res.send(offers)
    } catch (err) {
      transaction.rollback()
      next(err)
    }
  }
}

module.exports.getCustomersContests = (req, res, next) => {
  db.Contest.findAll({
    where: { status: req.headers.status, user_id: req.tokenData.userId },
    limit: req.query.limit,
    offset: req.query.offset ? req.query.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: ['id']
      }
    ]
  })
    .then(contests => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length)
      )
      let haveMore = true
      if (contests.length === 0) {
        haveMore = false
      }
      res.send({ contests, haveMore })
    })
    .catch(err => next(new ServerError(err)))
}

module.exports.getContests = (req, res, next) => {
  req.query.ownEntries = req.query.ownEntries === 'false' ? false : true

  const predicates = UtilFunctions.createWhereForAllContests(
    req.query.typeIndex,
    req.query.contestId,
    req.query.industry,
    req.query.awardSort
  )

  db.Contests.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.query.limit,
    offset: req.query.offset ? req.query.offset : 0,
    include: [
      {
        model: db.Offer,
        required: req.query.ownEntries,
        where: req.query.ownEntries ? { user_id: req.tokenData.userId } : {},
        attributes: ['id']
      }
    ]
  })
    .then(contests => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length)
      )
      let haveMore = true
      if (contests.length === 0) {
        haveMore = false
      }
      res.send({ contests, haveMore })
    })
    .catch(err => {
      next(new ServerError())
    })
}

module.exports.getOffers = async (req, res, next) => {
  try {
    const offers = await db.Offer.findAll({ order: [['id', 'DESC']], limit: 8, offset:req.query.offset })
    res.status(200).send({ offers })
  } catch (error) {
    next(error)
  }
}
