import React from 'react'
import styles from './AddPlace.module.scss'
import { useDispatch } from 'react-redux'
import { storeActions } from '../store/store'

export const AddPlace = () => {
    const dispatch = useDispatch()
    const addPlaceHandler = (ev: any) => {
        ev.preventDefault()
        if (!ev.target[0].value) return
        dispatch(storeActions.addPlace(ev.target[0].value))
        ev.target[0].value = ''
      }
    return (
        <form onSubmit={addPlaceHandler} className={styles['add-place']}>
            <input className={styles.input} type="text" placeholder='הוסף מיקום' />
            <button className={styles.button} type='submit'>+</button>
        </form>
    )
}
