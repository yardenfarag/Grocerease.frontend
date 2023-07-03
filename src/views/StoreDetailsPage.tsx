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
import styles from './StoreDetailsPage.module.scss'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { Place } from '../models/place'

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
  // const [store, setStore] = useState(currStore)
  
  const addPlaceHandler = (ev: any) => {
    ev.preventDefault()
    if (!ev.target[0].value) return
    dispatch(storeActions.addPlace(ev.target[0].value))
    ev.target[0].value = ''
  }
  const toggleShoppingListHandler = () => {
    setIsShoppingListModal(!isShoppingListModal)
  }
  const dragEndHandler = (result: DropResult) => {
    const storeCopy: Store = JSON.parse(JSON.stringify(store))
    let places: Place[] | undefined = storeCopy?.places
    const dropIdx: number | undefined = result.destination?.index
    const dragIdx = result.source.index
    let placeToInsert: Place | undefined = places?.find(
      (place: Place) => place.id === result.draggableId
    )
    places?.splice(dragIdx, 1)
    places?.splice(dropIdx!, 0, placeToInsert!)
    // setStore(storeCopy)
    dispatch(storeActions.saveStore(storeCopy!))
  }
  
  return (
    // <div style={{ background: `linear-gradient(to bottom right, #fff 20%, ${store?.color} 80%)` }}>
    <div>
      <AppHeader onToggleShoppingListHandler={toggleShoppingListHandler} />
      <main className={`${styles.main} ${isShoppingListModal ? styles['disable-interactions'] : ''}`}>
        <DragDropContext onDragEnd={dragEndHandler}>
          <Droppable droppableId={id!}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={styles['places-container']}>
                {store && store.places?.map((place: any, index: number) => {
                  return (
                    <PlaceDetails index={index} key={place.id} id={place.id} title={place.title} items={place.items} />
                  )
                })}
                {provided.placeholder}
                <form onSubmit={addPlaceHandler} className={styles['add-place']}>
                  <input className={styles.input} type="text" placeholder='הוסף מיקום' />
                  <button className={styles.button} type='submit'>+</button>
                </form>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      {isShoppingListModal && <ShoppingList onToggleShoppingListModal={toggleShoppingListHandler} />}
    </div>
  )
}
