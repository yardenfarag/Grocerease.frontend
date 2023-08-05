import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStoreById } from '../store/store'
import { useParams } from 'react-router-dom'
import { Store } from '../models/store'
import { RootState } from '../store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import styles from './StoreItems.module.scss'
import { SideNav } from '../components/Layout/SideNav'
import { AddItem } from '../components/Forms/AddItem'
import { Reorder, Apps } from '@mui/icons-material'
import { settingsActions } from '../store/settings'
import { ItemTable } from '../components/Tables/ItemTable'
import { Loader } from '../components/UI/Loader'


type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const StoreItems = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isAddItemForm, setIsAddItemForm] = useState(false)
  const loading = useSelector((state: RootState) => state.store.loading)
  let itemsView = useSelector((state: RootState) => state.settings.view)
  const { id } = useParams()
  useEffect(() => {
    if (!id) return
    dispatch(getStoreById(id))
  }, [id])
  let store: Store | null = useSelector((state: RootState) => state.store?.curStore)

  const setItemsViewHandler = (view: string) => {
    dispatch(settingsActions.toggleView(view))
  }
  return (
    <>
      {loading &&
        <div className={styles.loading}>
          <Loader height='80px' width='80px' />
        </div>}
      {!loading && <div>
        <main className={styles.main}>
          <SideNav />
          <div className={styles.container}>
            <h1 className={styles.h1}>{store?.title}</h1>
            <div className={styles['form-container']}>
              <div className={styles.div}>
                {!isAddItemForm && <button onClick={() => setIsAddItemForm(!isAddItemForm)} className={styles.button}><span className={styles.span}>+</span>הוסף מוצר</button>}
                {isAddItemForm && <AddItem onSetIsAddItemForm={() => setIsAddItemForm(!isAddItemForm)} />}
              </div>
              <div className={styles['view-picker']}>
                <Reorder onClick={() => setItemsViewHandler('list')} className={`${styles.icon} ${itemsView === 'list' ? styles.selected : ''}`} />
                <span className={styles.barrier}>|</span>
                <Apps onClick={() => setItemsViewHandler('cards')} className={`${styles.icon} ${itemsView === 'cards' ? styles.selected : ''}`} />
              </div>
            </div>
            {store?.items && <ItemTable items={store!.items!} />}
          </div>
        </main>
      </div>}
    </>
  )
}
