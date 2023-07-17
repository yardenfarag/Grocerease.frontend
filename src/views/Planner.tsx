import React, { useEffect } from 'react'
import styles from './Planner.module.scss'
import { ShoppingList } from '../components/ShoppingList'
import { SideNav } from '../components/SideNav'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getStoreById } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const Planner = () => {
    const dispatch:AppDispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        dispatch(getStoreById(id))
    }, [id])
    return (
        <main className={styles.main}>
            <SideNav />
            <div className={styles.container}>
                <ShoppingList />
            </div>
        </main>
    )
}
