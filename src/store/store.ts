import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../models/item'
import { Place } from '../models/place'
import { Store } from '../models/store'
import { Grocery } from '../models/grocery'
import { storeService } from '../services/store.service'
import { Product } from '../models/product'

export const getStores = createAsyncThunk('store', async () => {
  return await storeService.getStores()
})

export const getStoreById = createAsyncThunk('store/:id', async (id: string) => {
  return await storeService.getStoreById(id)
})

const initialStoreState = {
  filterBy: { txt: '' }, curStore: null as Store | null, loading: false, error: false,
  stores: [] as Store[], products: null as Product[] | null
}

const storeSlice = createSlice({
  name: 'store',
  initialState: initialStoreState,
  reducers: {
    addPlace: (state, action: PayloadAction<string>) => {
      const newPlace = { id: makeId(), title: action.payload, items: [] as Item[] }
      state.curStore?.places.unshift(newPlace)
      storeService.saveStore(state.curStore!)
    },
    addItem: (state, action: PayloadAction<{ itemToAdd: Item, placeId: string }>) => {
      const { title, quantity, expiry, imgUrl, barcode } = action.payload.itemToAdd
      const newItem = { id: makeId(), title, expiry, quantity, imgUrl, barcode }
      const place = state.curStore?.places.find((p: Place) => p.id === action.payload.placeId)
      if (!place) return state
      place?.items.push(newItem)
      storeService.saveStore(state.curStore!)
    },
    deleteItem: (state, action: PayloadAction<{ itemId: string, placeId: string }>) => {
      const place = state.curStore?.places.find((p: Place) => p.id === action.payload.placeId)
      const itemToDeleteIdx = place?.items.findIndex((item: Item) => item.id === action.payload.itemId)
      if (itemToDeleteIdx === undefined) { 
        return state
      }
      if (itemToDeleteIdx < 0) {
        return state
      }
      place?.items.splice(itemToDeleteIdx, 1)
      storeService.saveStore(state.curStore!)
    },
    updateItem: (state, action: PayloadAction<{ itemToUpdate: Item, placeId: string }>) => {
      const place = state.curStore?.places.find((p: Place) => p.id === action.payload.placeId)
      const placeIdx = state.curStore?.places.findIndex((p: Place) => p.id === action.payload.placeId)
      if (placeIdx === undefined) {
        return state;
      }
      const itemToUpdateIdx = place?.items.findIndex((item: Item) => item.barcode === action.payload.itemToUpdate.barcode) 
      if (itemToUpdateIdx === undefined) { 
        return state
      }
      if (itemToUpdateIdx < 0) {
        return state
      }
      state.curStore!.places[placeIdx]?.items.splice(itemToUpdateIdx, 1, action.payload.itemToUpdate)      
      storeService.saveStore(state.curStore!)
    },
    deleteGroceryFromShoppingList: (state, action: PayloadAction<string>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload)
      if (groceryIdx === undefined) { 
        return state
      }
      state.curStore?.shoppingList.splice(groceryIdx, 1)
      storeService.saveStore(state.curStore!)
    },
    addItemToShoppingList: (state, action: PayloadAction<{ barcode: string, title: string, quantity: number, imgUrl: string | undefined }>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload.barcode)
      if (groceryIdx === undefined) { 
        return state
      }
      if (groceryIdx > -1) return state
      state.curStore?.shoppingList.push(action.payload)
      storeService.saveStore(state.curStore!)
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy.txt = action.payload
    },
    addStore: (state, action: PayloadAction<{ newStoreTitle: string, selectedColor: string}>) => {
      const newStore = storeService.getEmptyStore()
      newStore.title = action.payload.newStoreTitle
      newStore.color = action.payload.selectedColor
      // newStore.userIds.push(action.payload.userId)
      storeService.saveStore(newStore)
      getStores()
      // state.stores = storeService.getStoresWithUserId(action.payload.userId)
    },
    updateGrocery: (state, action: PayloadAction<Grocery>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g:Grocery) => g.barcode === action.payload.barcode)
      if (groceryIdx === undefined) { 
        return state
      }
      if (groceryIdx < 0) {
        return state
      }
      state.curStore?.shoppingList.splice(groceryIdx, 1, action.payload)
      storeService.saveStore(state.curStore!)
    },
    addGroceryToShoppingList: (state, action: PayloadAction<Grocery>) => {
      state.curStore?.shoppingList.push(action.payload)
      storeService.saveStore(state.curStore!)
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

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}