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
    // addPlace: (state, action: PayloadAction<string>) => {
    //   const newPlace = { id: makeId(), title: action.payload, items: [] as Item[] }
    //   state.curStore?.places.push(newPlace)
    //   storeService.saveStore(state.curStore!)
    // },
    addItem: (state, action: PayloadAction<Item>) => {
      const { title, quantity, expiry, imgUrl, barcode, place } = action.payload
      const newItem = { id: makeId(), title, expiry, quantity, imgUrl, barcode, place }
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
    addItemToShoppingList: (state, action: PayloadAction<{ barcode: string, title: string, quantity: number, imgUrl: string | undefined }>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload.barcode)
      if (groceryIdx !== undefined) {
        state.curStore?.shoppingList.push(action.payload)
        storeService.saveStore(state.curStore!)
      }
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy.txt = action.payload
    },
    addStore: (state, action: PayloadAction<{ newStoreTitle: string, selectedColor: string }>) => {
      const newStore = storeService.getEmptyStore()
      newStore.title = action.payload.newStoreTitle
      newStore.color = action.payload.selectedColor
      storeService.saveStore(newStore)
      getStores()
    },
    updateGrocery: (state, action: PayloadAction<Grocery>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload.barcode)
      if (groceryIdx !== undefined) {
        state.curStore?.shoppingList.splice(groceryIdx, 1, action.payload)
        storeService.saveStore(state.curStore!)
      }
    },
    addGroceryToShoppingList: (state, action: PayloadAction<Grocery>) => {
      state.curStore?.shoppingList.unshift(action.payload)
      storeService.saveStore(state.curStore!)
    },
    // updatePlaceTitle: (state, action: PayloadAction<{ placeId: string, placeTitle: string }>) => {
    //   const placeIdx = state.curStore?.places.findIndex((p: Place) => p.id === action.payload.placeId)
    //   if (placeIdx !== undefined) {
    //     state.curStore!.places[placeIdx].title = action.payload.placeTitle
    //     storeService.saveStore(state.curStore!)
    //   }
    // },
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

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}