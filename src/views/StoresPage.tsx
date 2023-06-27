import React, { FormEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StorePreview } from '../components/StorePreview'
import { getStoreById, getStores, storeActions } from '../store/store';
import { Icon } from '../models/icon';
import { storeService } from '../services/store.service';
import { RootState } from '../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const StoresPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const stores = useSelector((state: RootState) => state.store.stores)
  const colors = ['#a2d2ff', '#9ae3b7', '#e6cda3', '#f2eac4', '#f0a8a8', '#eab0e3', '#95dbda', '#9baadd']
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [newStoreTitle, setNewStoreTitle] = useState('')
  const setSelectedColorHandler = (color: string) => {
    setSelectedColor(color)
  }

  useEffect(() => {
    dispatch(getStores())
    console.log('hi from useeffects')
  }, [])
  
  const setCurStoreHandler = (id: string) => {
    dispatch(getStoreById(id))
  }
  const setNewStoreTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewStoreTitle(ev.target.value)
  }
  const addStoreHandler = async() => {
    if (!newStoreTitle) {
      return
    }
    dispatch(storeActions.addStore({ newStoreTitle, selectedColor}))
    dispatch(getStores)
    setNewStoreTitle('')
  }
  return (
    <div className='store-page'>
      {/* <h1>בחר מיקום</h1> */}
      <div className="stores flex">
        {Array.isArray(stores) && stores.map((store: any) => {
          return <StorePreview key={store._id} id={store._id} color={store.color} title={store.title} />
        })}
      </div>
      <div className="add-store">
        <div style={{ backgroundColor: selectedColor }} className='add-store-back'></div>
        <div className='add-store-front'>
          <input onChange={setNewStoreTitleHandler} type="text" value={newStoreTitle} placeholder='הוסף מקום' />
          <div className='colors flex'>
            {colors.map((c: string, index) => {
              return <div
                onClick={() => setSelectedColorHandler(c)}
                className={selectedColor === c ? 'selected' : ''}
                style={{ backgroundColor: c }}
                key={c}>
              </div>
            })}
          </div>
          <button onClick={addStoreHandler}>+</button>
        </div>
      </div>
    </div>
  )
}
