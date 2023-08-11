import React from 'react'
import styles from './ProductFilter.module.scss'
import { Search } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { storeActions } from '../../store/store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getProducts } from '../../store/product'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const ProductFilter = () => {
    const dispatch: AppDispatch = useDispatch()
    const filterByExpiry = useSelector((state: RootState) => state.store.filterBy.expiry)
    const filterByHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getProducts({txt: ev.target.value}))
    }
    return (
        <div className={styles['product-filter']}>
            <Search className={styles.icon} />
            <input className={styles.input} onChange={filterByHandler} type="text" placeholder='חפש מוצר' />
        </div>
    )
}
