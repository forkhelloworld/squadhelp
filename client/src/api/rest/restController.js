import http from '../interceptor'

// User
export const registerRequest = data => http.post('registration', data)
export const loginRequest = data => http.post('login', data)
export const getUser = () => http.get('getUser')

export const updateUser = data => http.put('updateUser', data)
export const changeMark = data => http.post('changeMark', data)

export const payMent = data => http.post('pay', data.formData)
export const cashOut = data => http.post('cashout', data)

// Contest
export const updateContest = data => http.put('updateContest', data)
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`)
export const dataForContest = data => http.post('dataForContest', data)
export const getCustomersContests = data =>
  http.get('getCustomersContests', {
    params: { limit: data.limit, offset: data.offset },
    headers: {
      status: data.contestStatus
    }
  })
export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries
}) =>
  http.get('getAllContests', {
    params: {
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries
    }
  })
export const getContestById = data =>
  http.get('getContestById', {
    params: {
      contestId: data.contestId
    }
  })

export const setNewOffer = data => http.post('setNewOffer', data)
export const setOfferStatus = data => http.post('setOfferStatus', data)
export const getOffers = data =>
  http.get('getOffers', {
    params: {
      data
    }
  })

// Chat
export const getPreviewChat = () => http.get('getPreview')
export const changeChatFavorite = data => http.post('favorite', data)
export const changeChatBlock = data => http.post('blackList', data)
export const getDialog = data => http.get('getChat', { params: data })

export const removeChatFromCatalog = data =>
  http.delete('removeChatFromCatalog', data)
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data)
export const getCatalogList = data => http.get('getCatalogs', data)
export const createCatalog = data => http.post('createCatalog', data)
export const deleteCatalog = data => http.delete('deleteCatalog', data)
export const changeCatalogName = data => http.put('updateNameCatalog', data)
export const newMessage = data => http.post('newMessage', data)
