import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Card, Button, Popconfirm, message } from 'antd'
import styles from './index.css'

import { getListTable } from '../../../actions/samples'
import { isEmpty } from '../../../utils/lang'
import Search from './Search'

const initialState = {
  pageNo: 1,
  pageSize: 20,
  orderStatus: '',
  orderNo: '',
  payStartTime: '',
  payEndTime: ''
}

export const StatusOpitions = [{
  value: '',
  label: '全部'
}, {
  value: '10',
  label: '待付款'
}, {
  value: '20',
  label: '待发货'
}, {
  value: '30',
  label: '待收货'
}, {
  value: '40',
  label: '已完成'
}, {
  value: '50',
  label: '已取消'
}]

class ListTable extends Component {
  constructor(props) {
    super(props)
    // initial state
    this.state = { ...initialState }
  }

  componentWillMount() {
    this.props.dispatch(getListTable(this.state))
  }

  _handleOperate1 = record => {
    message.info('我是 Operate1')
  }

  _handleOperate2 = record => {
    message.info('我是 Operate2')
  }

  _columns = [
    { key: 'orderNo', title: '订单编号', dataIndex: 'orderNo' },
    { key: 'payTime', title: '下单时间', dataIndex: 'payTime' },
    {
      key: 'goodsName',
      title: '商品名称',
      dataIndex: 'goodsName',
      render: (text, record, index) => {
        return (
          <div>
            <span>{text}</span>
            <span>我是新加的</span>
          </div>
        )
      }
    },
    {
      title: '订单状态',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: (text, record, index) => {
        const status = StatusOpitions.filter(option => option.value === text)
        return status.length > 0 ? status[0].label : text
      }
    },
    {
      key: 'operation',
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => (
        <div className={styles['operation']}>
          <Popconfirm title='确定要 XXX 吗？' onConfirm={() => this._handleOperate1(record)}>
            <Button size='small'>XXX</Button>
          </Popconfirm>
          <a onClick={() => this._handleOperate2(record)}>操作</a>
        </div>
      ),
    },
  ]

  _handleSearch = searchData => {
    this.setState({ ...searchData, pageNo: 1 }, () => {
      this.props.dispatch(getListTable(this.state))
    })
  }

  _onChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter)
    this.setState({ pageNo: pagination.current }, () => {
      this.props.dispatch(getListTable(this.state))
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
        <Search onSearch={this._handleSearch} />
        <Table
          // style={{ width: '100%' }}
          pagination={pagination}
          columns={this._columns}
          onChange={this._onChange}
          rowKey='orderNo'
          dataSource={list}
        />
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
