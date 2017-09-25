import React from 'react'
// import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import * as urls from './constants'
import Layout from './container'
import Home from './container/home'

import SamplesListTable from './container/samples/listTable'
import SamplesListItem from './container/samples/listItem'
import DetailForm from './container/samples/detail'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.HOME,
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.SAMPLE_LIST_TALBE,
    exact: true,
    component: SamplesListTable,
    breadcrumbName: '表格列表',
    parentPath: urls.HOME
  },
  {
    path: urls.SAMPLE_LIST_ITEM,
    exact: true,
    component: SamplesListItem,
    breadcrumbName: '单项列表',
    parentPath: urls.HOME
  },
  {
    path: urls.SAMPLE_DETAIL_FORM,
    exact: true,
    component: DetailForm,
    breadcrumbName: '表单详情',
    parentPath: urls.HOME
  },
]

const RouteConfig = () => (
  <Router>
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={(match) => <Layout routes={ routes } match={match} content={route.component} path={route.path} />}
        />
      ))}
    </Switch>
  </Router>
)

export default RouteConfig

