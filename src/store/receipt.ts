import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Item } from '../models/item'
import { receiptService } from '../services/receipt.service'

const initialReceiptState = {
    items: null as Item[] | null,
    loading: false,
    error: false
}

export const getProductsFromReceipt = createAsyncThunk('receipt', async (imgUrl: string) => {
    return receiptService.sendReceipt(imgUrl)
})


const receiptSlice = createSlice({
    name: 'receipt',
    initialState: initialReceiptState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsFromReceipt.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getProductsFromReceipt.pending, (state, action) => {
                state.items = null
                state.loading = true
                state.error = false
            })
            .addCase(getProductsFromReceipt.rejected, (state, action) => {
                state.items = null
                state.loading = false
                state.error = true
            })
    }
})

export const receiptActions = receiptSlice.actions

export default receiptSlice.reducer