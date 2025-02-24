import ACTION from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  error: null,
  offers: []
}

export default function getOffersReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_OFFERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null
      }
    }
    case ACTION.GET_OFFERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: [...action.data.offers],
        haveMore: action.data.haveMore
      }
    }
    case ACTION.GET_OFFERS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        offers: []
      }
    }
    default:
      return state
  }
}
