/* eslint-disable no-console */

import React from 'react'

import { Input, Select, Button, DatePicker } from 'antd'
import zhCN from 'antd/lib/date-picker/locale/zh_CN'

import { StatusOpitions } from '../listTable'
import styles from './index.css'

const { Option } = Select
const { RangePicker } = DatePicker

const initSearchState = {
  orderNo: '',
  orderStatus: '',
  payStartTime: '',
  payEndTime: '',
}

class Search extends React.Component {
  constructor(props) {
    super(props)
    // initial state
    this.state = initSearchState
  }

  _handleDateChange = (dates, dateStrings) => { // dates: [moment, moment], dateStrings: [string, string]
    this.setState({
      payStartTime: dateStrings[0],
      payEndTime: dateStrings[1],
    })
  }

  _handleSearch = () => {
    this.props.onSearch && this.props.onSearch(this.state)
  }

  render() {
    return (
      <div className={styles['search']}>
        <span>订单状态： </span>
        <div className={styles['search-item-wrapper']}>
          <Select
            value={this.state.orderStatus}
            style={{ width: 150 }}
            onChange={value => this.setState({ orderStatus: value })}
          >
            {StatusOpitions.map((item, index) => (
              <Option key={index} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </div>
        <span>订单号： </span>
        <div className={styles['search-item-wrapper']}>
          <Input
            className={styles['search-input']}
            value={this.state.orderNo}
            onChange={e => this.setState({ orderNo: e.target.value })}
          />
        </div>
        <span>支付时间： </span>
        <div className={styles['search-item-wrapper']}>
          <RangePicker
            showTime={true}
            format='YYYY-MM-DD HH:mm:ss'
            locale={zhCN}
            onChange={this._handleDateChange}
          />
        </div>
        <span className={styles['search-item-wrapper']}>
          <Button type='primary' icon='search' onClick={this._handleSearch}>查询</Button>
        </span>
      </div>
    )
  }
}

export default Search
