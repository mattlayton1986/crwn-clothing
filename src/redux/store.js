import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from './root.reducer'

const middlewares = []

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }

//Added to enable Redux DevTools extension
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// create store object from root reducer and middlewares
const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
)

// create persistent localStorage store
const persistor = persistStore(store)

export { store, persistor }