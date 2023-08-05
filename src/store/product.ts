import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../models/product'
import { productService } from '../services/product.service'

const initialProductState = {
    products: null as Product[] | null,
    loading: false, 
    error: false,
    curProduct: null as Product | null
}

export const getProducts = createAsyncThunk('product', async (filterBy: { txt: string }) => {
    if (filterBy.txt.length >= 2) {
        return productService.getProducts(filterBy)
    }
    else return null
})

export const getProductByBarcode = createAsyncThunk('product/:barcode', async (barcode: string) => {
    if (barcode) {
        return productService.getProductByBarcode(barcode)
    }
    else return null
})


const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getProducts.pending, (state, action) => {
                state.products = null
                state.loading = true
                state.error = false
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = null
                state.loading = false
                state.error = true
            })
            .addCase(getProductByBarcode.fulfilled, (state, action) => {
                state.curProduct = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getProductByBarcode.pending, (state, action) => {
                state.curProduct = null
                state.loading = true
                state.error = false
            })
            .addCase(getProductByBarcode.rejected, (state, action) => {
                state.curProduct = null
                state.loading = false
                state.error = true
            })
    }
})

export const userActions = productSlice.actions

export default productSlice.reducer