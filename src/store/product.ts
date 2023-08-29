import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Gs1Product, Product } from '../models/product'
import { productService } from '../services/product.service'

const initialProductState = {
    products: null as Product[] | null,
    count: 0,
    pageCount: 0,
    loading: false,
    loadingProduct: false,
    error: false,
    curProduct: null as Gs1Product | null,
    filterBy: { txt: '' }
}

export const getProducts = createAsyncThunk('product', async ({ txt, page }: { txt: string; page?: number }) => {
    return productService.getProducts({ txt }, page)
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
    reducers: {
        setFilterBy: (state, action: PayloadAction<string>) => {
            state.filterBy.txt = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload.products
                state.count = action.payload.pagination.count
                state.pageCount = action.payload.pagination.pageCount
                state.loading = false
                state.error = false
            })
            .addCase(getProducts.pending, (state, action) => {
                state.products = null
                state.count = 0
                state.pageCount = 0
                state.loading = true
                state.error = false
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.count = 0
                state.pageCount = 0
                state.products = null
                state.loading = false
                state.error = true
            })
            .addCase(getProductByBarcode.fulfilled, (state, action) => {
                state.curProduct = action.payload
                state.loadingProduct = false
                state.error = false
            })
            .addCase(getProductByBarcode.pending, (state, action) => {
                state.curProduct = null
                state.loadingProduct = true
                state.error = false
            })
            .addCase(getProductByBarcode.rejected, (state, action) => {
                state.curProduct = null
                state.loadingProduct = false
                state.error = true
            })
    }
})

export const productActions = productSlice.actions

export default productSlice.reducer