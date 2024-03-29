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
import { MarketDetails } from '../components/Details/MarketDetails'
import { Market } from '../models/Market'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const Planner = () => {
    const dispatch: AppDispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.store.loading)
    const [isProductModal, setIsProductModal] = useState<boolean>(false)
    const [isMarketModal, setIsMarketModal] = useState<boolean>(false)
    const [market, setMarket] = useState<Market>({} as Market)
    const [coords, setCoords] = useState({top: 0, left: 0})

    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        dispatch(getStoreById(id))
    }, [id])

    const toggleProductModalHandler = () => {
        setIsProductModal(!isProductModal)
    }
    const toggleMarketModalHandler = (market:Market) => {
        setMarket({...market})
        setIsMarketModal(!isMarketModal)
    }
    return (
        <>
            {loading &&
                <div className={styles.loading}>
                    <Loader height='120px' width='120px' />
                </div>}
            {!loading && <main className={`${styles.main} ${isProductModal || isMarketModal ? styles['disable-interactions'] : styles['']}`}>
                <SideNav />
                <div className={`${styles.container} `}>
                    <ShoppingList onOpenProductModal={toggleProductModalHandler} />
                    <MarketList onOpenMarketModal={toggleMarketModalHandler}/>
                </div>
            </main>}
                    {isProductModal && <GroceryDetails onToggleModal={toggleProductModalHandler} />}
                    {isMarketModal && <MarketDetails market={market} onToggleModal={() => setIsMarketModal(!isMarketModal)} />}
        </>
    )
}
