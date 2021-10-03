import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'

import rootReducer from './root.reducer'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// Replaced thunk with saga
// const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

//Added to enable Redux DevTools extension
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// create store object from root reducer and middlewares
const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
)

sagaMiddleware.run(rootSaga)

// create persistent localStorage store
const persistor = persistStore(store)

export { store, persistor }