import React, { useEffect, useState } from 'react'
import styles from './Planner.module.scss'
import { ShoppingList } from '../components/Lists/ShoppingList'
import { SideNav } from '../components/Layout/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStoreById } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { MarketList } from '../components/Lists/MarketList'
import { Loader } from '../components/UI/Loader'
import { GroceryDetails } from '../components/Details/GroceryDetails'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const Planner = () => {
    const dispatch: AppDispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.store.loading)
    const [isProductModal, setIsProductModal] = useState<boolean>(false)

    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        dispatch(getStoreById(id))
    }, [id])

    const toggleProductModal = () => {
        setIsProductModal(!isProductModal)
    }
    return (
        <>
            {loading &&
                <div className={styles.loading}>
                    <Loader height='80px' width='80px' />
                </div>}
            {!loading && <main className={`${styles.main}`}>
                <SideNav />
                <div className={`${styles.container} ${isProductModal ? styles['disable-interactions'] : styles['']}`}>
                    <ShoppingList onOpenProductModal={toggleProductModal} />
                    <MarketList />
                </div>
                    {isProductModal && <GroceryDetails onToggleModal={toggleProductModal} />}
            </main>}
        </>
    )
}
