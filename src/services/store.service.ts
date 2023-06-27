import { Store } from '../models/store'
import { httpService } from './http.service'

export const storeService = {
  getStores,
  getStoreById,
  deleteStore,
  saveStore,
  getEmptyStore,
}

async function getStores() {
  return await httpService.get('store')
}

async function getStoreById(id: string) {
  return await httpService.get(`store/${id}`)
}

async function deleteStore(id: string) {
  return await httpService.delete(`store/${id}`)
}

async function saveStore(store: Store) {
  let savedStore
  if (store._id) {
    savedStore = await httpService.put(`store/${store._id}`, store)
  } else {
    savedStore = await httpService.post('store', store)
  }  
  return savedStore
}

function getEmptyStore(): Store {
  return {
    title: '',
    color: '',
    places: [],
    shoppingList: [],
    userIds: []
  }
}


