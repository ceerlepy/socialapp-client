import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const logger = createLogger({
  /* https://github.com/evgenyrodionov/redux-logger */
  collapsed: true,
  diff: true
})

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
})

// const devTools =
//   process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     : null

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware, logger))
)

export default store
