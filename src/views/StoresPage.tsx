import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StorePreview } from '../components/StorePreview'
import { getStores, storeActions } from '../store/store';
import { RootState } from '../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import styles from './StoresPage.module.scss'
import { AddStore } from '../components/AddStore';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const StoresPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const stores = useSelector((state: RootState) => state.store.stores)
  const colors = ['#a2d2ff', '#9ae3b7', '#e6cda3', '#f2eac4', '#f0a8a8', '#eab0e3', '#95dbda', '#9baadd']
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [newStoreTitle, setNewStoreTitle] = useState('')

  useEffect(() => {
    dispatch(getStores())
  }, [stores])

  return (
    <main className={styles.main}>
      <div className={styles.stores}>
        {Array.isArray(stores) && stores.map((store: any) => {
          return <StorePreview key={store._id} id={store._id} color={store.color} title={store.title} />
        })}
      </div>
      <AddStore/>
    </main>
  )
}
