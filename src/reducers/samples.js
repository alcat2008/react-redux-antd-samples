/* 示例代码 */
import * as actionTypes from '../constants/samples'

const initialState = {
  list: [],
  page: {},
  detail: {}
}

export const samples = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LIST_TABLE:
    case actionTypes.GET_LIST_ITEM:
      return { ...state, list: action.payload.result, page: action.payload.page }
    case actionTypes.GET_FORM_DETAIL:
      return { ...state, detail: action.payload }
    default:
      return state
  }
}
