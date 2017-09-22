import { combineReducers } from 'redux'
import { common } from './common'

import { samples } from './samples'

const rootReducer = combineReducers({
  common,
  samples
})

export default rootReducer
