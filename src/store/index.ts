import { configureStore } from '@reduxjs/toolkit'

import storeReducer from './store'
import productReducer from './product'
import authReducer from './auth'
import settingsReducer from './settings'
import priceReducer from './price'

const store = configureStore({
    reducer: {
        store: storeReducer,
        product: productReducer,
        auth: authReducer,
        settings: settingsReducer,
        price: priceReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;