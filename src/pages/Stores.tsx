import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StorePreview } from '../components/Previews/StorePreview'
import { getStores } from '../store/store'
import { RootState } from '../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import styles from './Stores.module.scss'
import { AddStore } from '../components/Forms/AddStore'
import { Loader } from '../components/UI/Loader';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

export const Stores = () => {
  const dispatch: AppDispatch = useDispatch()
  const stores = useSelector((state: RootState) => state.store.stores)
  const loading = useSelector((state: RootState) => state.store.loading)

  useEffect(() => {
    dispatch(getStores())
  }, [])

  const handleAddStore = () => {
    dispatch(getStores())
  }

  return (
    <main className={styles.main}>
      <div className={styles.stores}>
        {loading  && <Loader height='120px' width='120px'/>}
        {!loading && Array.isArray(stores) && stores.map((store: any) => {
          return <StorePreview key={store._id} id={store._id} color={store.color} title={store.title} />
        })}
      </div>
      {!loading && <AddStore onAddStore={handleAddStore}/>}
    </main>
  )
}
