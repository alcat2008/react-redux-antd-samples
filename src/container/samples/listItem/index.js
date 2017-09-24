import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Input, Pagination } from 'antd'
import styles from './index.css'

import { getListItem } from '../../../actions/samples'
import { isEmpty } from '../../../utils/lang'
import Item from './Item'

const initialState = {
  pageNo: 1,
  pageSize: 20,
  orderNo: '',
}

class ListTable extends Component {
  constructor(props) {
    super(props)
    // initial state
    this.state = { ...initialState }
  }

  componentWillMount() {
    this.props.dispatch(getListItem(this.state))
  }

  _handleSearch = () => {
    this.setState({ pageNo: 1 }, () => {
      this.props.dispatch(getListItem(this.state))
    })
  }

  _handlePageChange = (page, pageSize) => {
    this.setState({
      pageNo: page,
    }, () => {
      this.props.dispatch(getListItem(this.state))
    })
  }

  render() {
    const { list, page } = this.props
    if (isEmpty(list)) {
      return (
        <Card>暂无示例数据</Card>
      )
    }

    const pagination = {
      total: parseInt(page.totalCount),
      pageSize: this.state.pageSize,
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 项`,
    }

    return (
      <div>
        <div className={styles['search']}>
          <span>订单号： </span>
          <div className={styles['search-item-wrapper']}>
            <Input
              className={styles['search-input']}
              value={this.state.orderNo}
              onChange={e => this.setState({ orderNo: e.target.value })}
            />
          </div>
          <span className={styles['search-item-wrapper']}>
            <Button type='primary' icon='search' onClick={this._handleSearch}>查询</Button>
          </span>
        </div>
        {
          list.map((itemData, index) => (
            <Item key={index} data={itemData} />
          ))
        }
        <div className={styles['pagination']}>
          <Pagination
            {...pagination}
            current={this.state.pageNo}
            onChange={this._handlePageChange}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.samples.list,
    page: state.samples.page,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
