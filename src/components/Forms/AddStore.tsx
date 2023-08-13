import React, { useState } from 'react'
import { RootState } from '../../store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import styles from './AddStore.module.scss'
import { useDispatch } from 'react-redux'
import { getStores, storeActions } from '../../store/store'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

interface Props {
  onAddStore: () => void
}

export const AddStore: React.FC<Props> = ({ onAddStore }) => {
  const dispatch: AppDispatch = useDispatch()
  const colors = ['#007aff', '#5cdb5c', '#ffa500', '#ffff00', '#ff0021', '#f95573', '#5ac8fa', '#5856d6']
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

    try {
      await dispatch(storeActions.addStore({ newStoreTitle, selectedColor }))
      setNewStoreTitle('')
      onAddStore()
    } catch (error) {
      console.error('Error adding store:', error)
    }
  }

  return (
    <div style={{ border: '2px solid ' + selectedColor }} className={styles['add-store']}>
      <input className={styles.input}
        onChange={setNewStoreTitleHandler}
        type="text"
        required
        maxLength={20}
        value={newStoreTitle}
        placeholder='המטבח שלי' />
      <div className={styles.colors}>
        {colors.map((c: string) => {
          return <div
            onClick={() => setSelectedColorHandler(c)}
            className={`${styles.div} ${selectedColor === c ? styles.selected : ''}`}
            style={{ backgroundColor: c }}
            key={c}>
          </div>
        })}
      </div>
      <button 
      style={{ backgroundColor: selectedColor}} 
      disabled={!newStoreTitle} 
      className={styles.button} 
      onClick={addStoreHandler}>הוספה</button>
    </div>
  )
}
