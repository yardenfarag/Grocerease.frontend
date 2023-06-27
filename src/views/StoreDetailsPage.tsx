import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlaceDetails } from '../components/PlaceDetails'
import { getStoreById, storeActions } from '../store/store'
import { useParams } from 'react-router-dom'
import { Store } from '../models/store'
import { ShoppingList } from '../components/ShoppingList'
import { AppHeader } from '../components/AppHeader'
import { RootState } from '../store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const StoreDetailsPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { id } = useParams()
  const [isShoppingListModal, setIsShoppingListModal] = useState(false)
  
  useEffect(() => {
    if (!id) return
    dispatch(getStoreById(id))
  }, [id])
  let store: Store | null = useSelector((state: RootState) => state.store.curStore)

  const addPlaceHandler = (ev: any) => {
    ev.preventDefault()
    if (!ev.target[0].value) return
    dispatch(storeActions.addPlace(ev.target[0].value))
    ev.target[0].value = ''
  }
  const toggleShoppingListHandler = () => {
    setIsShoppingListModal(!isShoppingListModal)
  }
  return (
    <div style={{ background: `linear-gradient(to bottom right, #fff, ${store?.color})` }}>
      <AppHeader onToggleShoppingListHandler={toggleShoppingListHandler} />
      <main>
        <div className={`places-container ${isShoppingListModal ? 'disable-interactions' : ''}`}>
          <form onSubmit={addPlaceHandler} className="add-place">
            <input type="text" placeholder='הוסף מיקום' />
            <button type='submit'>+</button>
          </form>
          {store && store.places.map((place: any) => {
            return (
              <PlaceDetails key={place.id} id={place.id} title={place.title} items={place.items} />
            )
          })}
        </div>
        {isShoppingListModal && <ShoppingList color={store?.color} />}
      </main>
    </div>
  )
}
