import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../models/item'
import { Place } from '../models/place'
import { Store } from '../models/store'
import { Grocery } from '../models/grocery'
import { storeService } from '../services/store.service'
import { Product } from '../models/product'

const initialStoreState = {
  filterBy: { txt: '' }, curStore: null as Store | null,
  stores: null as Store[] | null, products: null as Product[] | null
}

const storeSlice = createSlice({
  name: 'store',
  initialState: initialStoreState,
  reducers: {
    setStores: (state, action: PayloadAction<string>) => {
      const stores = storeService.getStoresWithUserId(action.payload)
      state.stores = stores
    },
    getProductsByTxt: (state, action: PayloadAction<string>) => {
      if (action.payload.length < 2) {
        state.products = []
        return
      }
      const products = storeService.getProducts(action.payload)
      state.products = products
    },
    setCurStore: (state, action: PayloadAction<string>) => {
      const store = storeService.getStoreById(action.payload)
      if (store) {
        state.curStore = store
        return
      }
      state.curStore = null
    },
    addPlace: (state, action: PayloadAction<string>) => {
      const newPlace = { id: makeId(), title: action.payload, items: [] as Item[] }
      state.curStore?.places.unshift(newPlace)
      storeService.saveStore(state.curStore!)
    },
    addItem: (state, action: PayloadAction<{ itemToAdd: Item, placeId: string}>) => {
      const { title, quantity, expiry, imgUrl, barcode } = action.payload.itemToAdd
      const newItem = { id: makeId(), title, expiry, quantity, imgUrl, barcode }
      const place = state.curStore?.places.find((p: Place) => p.id === action.payload.placeId)
      if (!place) return state
      place?.items.push(newItem)
      storeService.saveStore(state.curStore!)
    },
    deleteItem: (state, action: PayloadAction<{ itemId: string, placeId: string }>) => {
      const place = state.curStore?.places.find((p: Place) => p.id === action.payload.placeId)
      const itemToDeleteIdx = place?.items.findIndex((item: Item) => item.id === action.payload.itemId) || 0
      if (itemToDeleteIdx < 0) {
        return state
      }
      place?.items.splice(itemToDeleteIdx, 1)
      storeService.saveStore(state.curStore!)
    },
    updateItem: (state, action: PayloadAction<{ itemToUpdate: Item, placeId: string }>) => {

      const place = state.curStore?.places.find((p: Place) => p.id === action.payload.placeId)
      const itemToUpdpateIdx = place?.items.findIndex((item: Item) => item.id === action.payload.itemToUpdate.id) || 0
      if (itemToUpdpateIdx < 0) {
        return state
      }
      place?.items.splice(itemToUpdpateIdx, 1, action.payload.itemToUpdate)
      storeService.saveStore(state.curStore!)
    },
    // addGroceryToShoopingList: (state, action: PayloadAction<string>) => {
    //   state.curStore?.shoppingList.push({ id: makeId(), title: action.payload })
    //   storeService.saveStore(state.curStore!)
    // },
    deleteGroceryFromShoppingList: (state, action: PayloadAction<string>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload) || -1
      state.curStore?.shoppingList.splice(groceryIdx, 1)
      storeService.saveStore(state.curStore!)
    },
    addItemToShoppingList: (state, action: PayloadAction<{ barcode:string, title:string, quantity:number, imgUrl:string }>) => {
      const groceryIdx = state.curStore?.shoppingList.findIndex((g: Grocery) => g.barcode === action.payload.barcode) || -1
      if (groceryIdx > -1) return state
      state.curStore?.shoppingList.push(action.payload)
      storeService.saveStore(state.curStore!)
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy.txt = action.payload
    },
    addStore: (state, action: PayloadAction<{ newStoreTitle: string, selectedColor: string, userId: string }>) => {
      const newStore = storeService.getEmptyStore()
      newStore.title = action.payload.newStoreTitle
      newStore.color = action.payload.selectedColor
      newStore.userIds.push(action.payload.userId)
      storeService.saveStore(newStore)
      state.stores = storeService.getStoresWithUserId(action.payload.userId)
    }
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