import React, { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import { SideNav } from '../components/Layout/SideNav'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStoreById } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Loader } from '../components/UI/Loader'
import { GroceryDetails } from '../components/Details/GroceryDetails'
import { ProductList } from '../components/Lists/ProductList'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const Products = () => {
    const dispatch: AppDispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.store.loading)
    const [isProductModal, setIsProductModal] = useState<boolean>(false)

    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        dispatch(getStoreById(id))
    }, [id])

    const toggleProductModalHandler = () => {
        setIsProductModal(!isProductModal)
    }

    return (
        <>
            {loading &&
                <div className={styles.loading}>
                    <Loader height='120px' width='120px' />
                </div>}
            {!loading && <main className={`${styles.main} ${isProductModal ? styles['disable-interactions'] : styles['']}`}>
                <SideNav />
                <div className={`${styles.container} `}>
                    <ProductList onOpenProductModal={toggleProductModalHandler} />
                </div>
            </main>}
                {isProductModal && <GroceryDetails onToggleModal={toggleProductModalHandler} />}
        </>
    )
}
