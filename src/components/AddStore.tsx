import React, { useState } from 'react'
import { RootState } from '../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import styles from './AddStore.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getStores, storeActions } from '../store/store';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const AddStore = () => {
    const dispatch: AppDispatch = useDispatch()
    const stores = useSelector((state: RootState) => state.store.stores)
    const colors = ['#a2d2ff', '#9ae3b7', '#e6cda3', '#f2eac4', '#f98a8a', '#eab0e3', '#95dbda', '#9baadd']
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [newStoreTitle, setNewStoreTitle] = useState('')
    const setSelectedColorHandler = (color: string) => {
      setSelectedColor(color)
    }
    const setNewStoreTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setNewStoreTitle(ev.target.value)
      }
      const addStoreHandler = async () => {
        if (!newStoreTitle) {
          return
        }
        dispatch(storeActions.addStore({ newStoreTitle, selectedColor }))
        // dispatch(getStores)
        setNewStoreTitle('')
      }
    return (
        <div className={styles['add-store']}>
            <div style={{ backgroundColor: selectedColor }} className={styles['add-store-back']}></div>
            <div className={styles['add-store-front']}>
                <input className={styles.input} 
                onChange={setNewStoreTitleHandler} 
                type="text" 
                required
                maxLength={20}
                value={newStoreTitle} 
                placeholder='לדוגמה: המטבח שלי' />
                <div className={styles.colors}>
                    {colors.map((c: string, index) => {
                        return <div
                            onClick={() => setSelectedColorHandler(c)}
                            className={`${styles.div} ${selectedColor === c ? styles.selected : ''}`}
                            style={{ backgroundColor: c }}
                            key={c}>
                        </div>
                    })}
                </div>
                <button disabled={!newStoreTitle} className={styles.button} onClick={addStoreHandler}>+</button>
            </div>
        </div>

    )
}
