import React, { Component } from 'react'
import { Popconfirm, Button, message } from 'antd'
import styles from './index.css'

class Item extends Component {
  _handleOperate1 = params => {
    message.info('我是 Operate1')
  }

  _handleOperate2 = params => {
    message.info('我是 Operate2')
  }

  render() {
    const { data } = this.props
    return (
      <div className={styles['list-item']}>
        <div>
          <div><span>订单编号</span><span>{data.orderNo}</span></div>
          <div><span>下单时间</span><span>{data.payTime}</span></div>
          <div><span>下单时间</span><span>{data.payTime}</span></div>
          <div><span>商品名称</span><span>{data.goodsName}</span></div>
          <div><span>订单状态</span><span>{data.orderStatus}</span></div>
        </div>
        <div className={styles['operation']}>
          <Popconfirm title='确定要 XXX 吗？' onConfirm={() => this._handleOperate1(data)}>
            <Button size='small'>XXX</Button>
          </Popconfirm>
          <a onClick={() => this._handleOperate2(data)}>操作</a>
        </div>
      </div>
    )
  }
}

export default Item
