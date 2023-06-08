import { configureStore } from '@reduxjs/toolkit'

import storeReducer from './store'
import userReducer from './user'

const store = configureStore({
    reducer: {store: storeReducer, user:userReducer}
})

export default store
export type RootState = ReturnType<typeof store.getState>;