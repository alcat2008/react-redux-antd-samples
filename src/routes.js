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

import SamplesListTale from './container/samples/listTable'

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
    component: SamplesListTale,
    breadcrumbName: '表格列表',
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

