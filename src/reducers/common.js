/**
 * Create by Evan Chan
 * on 22, Aug, 2017
 * 全局公用
 */

import {
  SHOW_SPIN
} from '../constants/common'

export const common = (state = {}, action) => {
  switch (action.type) {
    case SHOW_SPIN:
      return Object.assign({}, state, { showSpin: action.data })
    default:
      return state
  }
}
