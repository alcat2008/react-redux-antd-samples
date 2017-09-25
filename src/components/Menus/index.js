import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import * as urls from '../../constants'
import classNames from 'classnames'
import storage from 'Util/storage'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      openKeys: storage.get('openKeys') || [],
      current: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.onOpenChange = this.onOpenChange.bind(this)
    this.getAncestorKeys = this.getAncestorKeys.bind(this)
  }

  handleClick = (e) => {
    this.setState({ current: e.key })
  }

  onOpenChange(openKeys) {
    const state = this.state
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey)
    }
    console.log(nextOpenKeys)
    this.setState({ openKeys: nextOpenKeys }, () => {
      storage.set('openKeys', nextOpenKeys)
    })
  }

  getAncestorKeys(key) {
    const map = {
      mall: ['classify', 'center'],
      takeout: ['classify', 'center'],
      group: ['classify', 'center'],
      ebooking: ['order'],
      takeoutorder: ['order'],
      takeout_commodity: ['commodity'],
      normal_commodity: ['commodity'],
      classify: ['center'],
      'add_shop': ['shops'],
      'search_shop': ['shops']
    }
    return map[key] || []
  }

  getMenuItemClass(str) {
    const pathName = this.props.match.location.pathname
    if (str !== urls.HOME) {
      return classNames({
        'ant-menu-item-selected': pathName.indexOf(str) > -1,
      })
    }
    return classNames({
      'ant-menu-item-selected': pathName === str,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode ? 'vertical' : 'inline',
    })
  }

  render() {
    return (
      <Menu
        mode={this.state.mode}
        selectedKeys={[this.props.selectedMenu]}
        style={{ border: 'none' }}
        onOpenChange={this.onOpenChange}
        openKeys={this.state.openKeys}
        onClick={this.handleClick}
      >
        <MenuItem key='mams_home' className={this.getMenuItemClass(urls.HOME)}>
          <Link to={urls.HOME}><Icon type='home'/>首页</Link>
        </MenuItem>
        <SubMenu key='shops' title={<p><Icon type='laptop'/><span>示例程序</span></p>}>
          <Menu.Item key='SAMPLE_LIST_TALBE' className={this.getMenuItemClass(urls.SAMPLE_LIST_TALBE)}>
            <Link to={urls.SAMPLE_LIST_TALBE}>表格列表</Link>
          </Menu.Item>
          <Menu.Item key='SAMPLE_LIST_ITEM' className={this.getMenuItemClass(urls.SAMPLE_LIST_ITEM)}>
            <Link to={urls.SAMPLE_LIST_ITEM}>单项列表</Link>
          </Menu.Item>
          <Menu.Item key='SAMPLE_DETAIL_FORM' className={this.getMenuItemClass(urls.SAMPLE_DETAIL_FORM)}>
            <Link to={urls.SAMPLE_DETAIL_FORM}>表单详情</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default MamsMenu
