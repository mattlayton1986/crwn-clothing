import { combineReducers } from "redux"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/user.reducer"
import cartReducer from "./cart/cart.reducer"

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage, // storage is 'localStorage' in web
  whitelist: ['cart'], // only persist these reducers
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
})

// apply redux-persist to root reducer for state persistence in localStorage
export default persistReducer(persistConfig, rootReducer)