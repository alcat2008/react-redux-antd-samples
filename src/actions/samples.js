import { createAction } from 'redux-actions'
import fetchData from '../api/fetch'
import api from '../api/index'
import { message } from 'antd'
import { showSpin } from './common'
import * as actionTypes from '../constants/samples'

export const getListTable = arg => dispatch => {
  dispatch(showSpin({ bool: true, content: '正在加载数据....' }))
  fetchData(api.samples.listTable, arg).then(res => {
    if (res.code !== 0) {
      message.error(res.errmsg)
    } else {
      dispatch(createAction(actionTypes.GET_LIST_TABLE)(res.data))
    }
  }).then(() => {
    dispatch(showSpin({ bool: false, content: '' }))
  })
}

export const getListItem = arg => dispatch => {
  dispatch(showSpin({ bool: true, content: '正在加载数据....' }))
  fetchData(api.samples.listItem, arg).then(res => {
    if (res.code !== 0) {
      message.error(res.errmsg)
    } else {
      dispatch(createAction(actionTypes.GET_LIST_ITEM)(res.data))
    }
  }).then(() => {
    dispatch(showSpin({ bool: false, content: '' }))
  })
}
