/* 示例代码 */
import * as actionTypes from '../constants/samples'

const initialState = {
  list: [],
  page: {},
}

export const samples = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LIST_TABLE:
      return { ...state, list: action.payload.result, page: action.payload.page }
    default:
      return state
  }
}
