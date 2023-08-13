import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { priceService } from '../services/price.service'
import { Market } from '../models/Market'
import { Grocery } from '../models/grocery'

const initialPriceState = { markets: null as Market[] | null, loading: false, error: false }

export const getPrices = createAsyncThunk('price', async (args: { pos: { lat: number, lng: number }, rad: number, items?: Grocery[] }) => {
    return priceService.getPrices(args)
})


const priceSlice = createSlice({
    name: 'price',
    initialState: initialPriceState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPrices.fulfilled, (state, action) => {
                state.markets = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getPrices.pending, (state, action) => {
                state.markets = null
                state.loading = true
                state.error = false
            })
            .addCase(getPrices.rejected, (state, action) => {
                state.markets = null
                state.loading = false
                state.error = true
            })
    }
})

export const userActions = priceSlice.actions

export default priceSlice.reducer