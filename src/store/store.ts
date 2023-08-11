import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../models/item'
import { Store } from '../models/store'
import { Grocery } from '../models/grocery'
import { storeService } from '../services/store.service'
import { Product } from '../models/product'
import { utilService } from '../services/util.service'

export const getStores = createAsyncThunk('store', async () => {
  return await storeService.getStores()
})

export const getStoreById = createAsyncThunk('store/:id', async (id: string) => {
  return await storeService.getStoreById(id)
})

const initialStoreState = {
  filterBy: { txt: '', expiry: 'none' }, curStore: null as Store | null, loading: false, error: false,
  stores: [] as Store[], products: null as Product[] | null, addToShoppingListStatus: ''
}

const storeSlice = createSlice({
  name: 'store',
  initialState: initialStoreState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const newItem = {
        id: utilService.makeId(),
        ...action.payload
      }
      state.curStore?.items.unshift(newItem)
      storeService.saveStore(state.curStore!)
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const itemIdx = state.curStore?.items.findIndex((i: Item) => i.id === action.payload)
      if (itemIdx !== undefined) {
        state.curStore?.items.splice(itemIdx, 1)
        storeService.saveStore(state.curStore!)
      }
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const itemIdx = state.curStore?.items.findIndex((i: Item) => i.id === action.payload.id)
      if (itemIdx !== undefined) {
        state.curStore!.items.splice(itemIdx, 1, action.payload)
        storeService.saveStore(state.curStore!)
      }
    },
    deleteGroceryFromShoppingList: (state, action: PayloadAction<string>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload)
      if (groceryIdx !== undefined) {
        state.curStore?.shoppingList.splice(groceryIdx, 1)
        storeService.saveStore(state.curStore!)
      }
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy.txt = action.payload
    },
    setFilterByExpiry: (state, action: PayloadAction<string>) => {
      state.filterBy.expiry = action.payload
    },
    addStore: (state, action: PayloadAction<{ newStoreTitle: string, selectedColor: string }>) => {
      const newStore = storeService.getEmptyStore()
      newStore.title = action.payload.newStoreTitle
      newStore.color = action.payload.selectedColor
      storeService.saveStore(newStore)
    },
    updateGrocery: (state, action: PayloadAction<Grocery>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload.barcode)
      if (groceryIdx !== undefined) {
        state.curStore?.shoppingList.splice(groceryIdx, 1, action.payload)
        storeService.saveStore(state.curStore!)
      }
    },
    addToShoppingList: (state, action: PayloadAction<Grocery>) => {
      state.addToShoppingListStatus = ''
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload.barcode)
      if (groceryIdx !== undefined && groceryIdx >= 0) {
        state.addToShoppingListStatus = 'error'
        return state
      }
      state.curStore?.shoppingList.unshift(action.payload)
      storeService.saveStore(state.curStore!)
      state.addToShoppingListStatus = 'success'
    },
    saveStore: (state, action: PayloadAction<Store>) => {
      state.curStore = action.payload
      storeService.saveStore(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(getStores.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getStores.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(getStoreById.fulfilled, (state, action) => {
        state.curStore = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(getStoreById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getStoreById.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
})

export const storeActions = storeSlice.actions

export default storeSlice.reducer