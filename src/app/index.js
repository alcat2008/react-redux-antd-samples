import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import MainRouter from '../routes'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  // 开发环境使用，发布前注释掉，后期优化todo
  // applyMiddleware(logger)
)

ReactDOM.render(
	<Provider store={store}>
		<MainRouter />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
