import React, { FormEvent, useEffect, useState } from 'react'
import { Grocery } from '../models/grocery'
import { GroceryItem } from './GroceryItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Product } from '../models/product'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { storeActions } from '../store/store'
import { ProductSuggestions } from './ProductSuggestions'
import { getProducts } from '../store/product'
import { Store } from '../models/store'
import styles from './ShoppingList.module.scss'
import { SideNav } from './SideNav'
import { AddItemToShoppingList } from './AddItemToShoppingList'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {

}

export const ShoppingList: React.FC<Props> = (props) => {
    const store: Store | null = useSelector((state: RootState) => state.store.curStore)
    return (
        <main className={styles.main}>
            {/* <SideNav/> */}
            <div className={styles.container}>
                <h1>רשימת קניות</h1>
                <AddItemToShoppingList />
                <ul className={styles.ul}>
                    {store && store.shoppingList?.map((item: Grocery) => <GroceryItem key={item.barcode} item={item} />)}
                </ul>
            </div>
        </main>
    )
}
