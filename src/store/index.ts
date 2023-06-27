import { configureStore } from '@reduxjs/toolkit'

import storeReducer from './store'
// import userReducer from './user'
import productReducer from './product'
import authReducer from './auth'

const store = configureStore({
    reducer: {store: storeReducer, product: productReducer, auth: authReducer}
})

export default store
export type RootState = ReturnType<typeof store.getState>;